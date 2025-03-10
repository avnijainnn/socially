import { getInternships } from "@/actions/internship.action";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatDistanceToNow } from "date-fns";
import { Eye } from "lucide-react";
import React from 'react';

// Define types
type Internships = Awaited<ReturnType<typeof getInternships>>;
type Internship = Internships[number];

interface InternshipCardProps {
  internship: {
    id: string;
    title: string;
    description: string;
    eligibleYears: { year: string }[];
    imageUrl?: string; // Add imageUrl property
  };
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {internship.imageUrl && (
        <img src={internship.imageUrl} alt={internship.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      )}
      <h2 className="text-xl font-bold mb-2">{internship.title}</h2>
      <p className="text-gray-700 mb-4">{internship.description}</p>
      <div className="text-sm text-gray-500">
        Eligible Years: {internship.eligibleYears.map(year => year.year).join(", ")}
      </div>
    </div>
  );
};

export default InternshipCard;
