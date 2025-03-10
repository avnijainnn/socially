"use client";

import { useState } from "react";
import InternshipCard from "@/components/InternshipCard";

type YearState = {
  FIRST: boolean;
  SECOND: boolean;
  THIRD: boolean;
  FOURTH: boolean;
};

const yearLabels = ["FIRST", "SECOND", "THIRD", "FOURTH"];

export default function InternshipList({ internships }: { internships: any[] }) {
  const [selectedYears, setSelectedYears] = useState<YearState>({
    FIRST: false,
    SECOND: false,
    THIRD: false,
    FOURTH: false,
  });

  // Toggle selected years
  const handleYearToggle = (year: keyof YearState) => {
    setSelectedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };
  

  // Filter internships based on selected years
  const filteredInternships =
  Object.values(selectedYears).some((isSelected) => isSelected)
    ? internships.filter((internship) =>
        internship.eligibleYears.some(
          (eligibility: { year: keyof YearState }) => selectedYears[eligibility.year]
        )
      )
    : internships;




  return (
    <div>
      {/* Filter by Year */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Filter by Year</h2>
        <div className="flex space-x-4">
          {yearLabels.map((year) => (
            <label key={year} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedYears[year as keyof YearState]}
                onChange={() => handleYearToggle(year as keyof YearState)}
                className="w-4 h-4"
              />
              <span>{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Internship Listings */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No internships available.</p>
      )}
    </div>
  );
}
