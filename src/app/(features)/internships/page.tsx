// "use client";

// import { useState, useEffect } from "react";
// import { getInternships } from "@/actions/internship.action";
// import { getDbUserId } from "@/actions/user.action";
// import { currentUser } from "@clerk/nextjs/server";
// import InternshipCard from "@/components/InternshipCard";

// import Link from "next/link";
// import { Plus } from "lucide-react";

// export default function InternshipPage() {
//   interface Internship {
//     id: string;
//     eligibleYears: { year: string }[];
//   }

//   const [internships, setInternships] = useState<Internship[]>([]);
//   const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
//   const [selectedYears, setSelectedYears] = useState({
//     FIRST: false,
//     SECOND: false,
//     THIRD: false,
//     FOURTH: false,
//   });

//   useEffect(() => {
//     async function fetchData() {
//       const user = await currentUser();
//       const internships = await getInternships();
//       const dbUserId = await getDbUserId();
//       setInternships(internships);
//       setFilteredInternships(internships);
//     }
//     fetchData();
//   }, []);

//   interface YearState {
//     FIRST: boolean;
//     SECOND: boolean;
//     THIRD: boolean;
//     FOURTH: boolean;
//   }

//   const handleYearToggle = (year: keyof YearState): void => {
//     setSelectedYears((prev: YearState) => ({
//       ...prev,
//       [year]: !prev[year],
//     }));
//   };

//   useEffect(() => {
//     const filtered = internships.filter((internship) =>
//       Object.entries(selectedYears).some(
//         ([year, isSelected]) =>
//           isSelected &&
//           internship.eligibleYears.some((eligibleYear) => eligibleYear.year === year)
//       )
//     );
//     setFilteredInternships(filtered.length > 0 ? filtered : internships);
//   }, [selectedYears, internships]);

//   return (
//     <main className="max-w-6xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold">Internship Opportunities</h1>
//         <Link
//           href="/dashboard"
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <Plus className="w-5 h-5" />
//           Add New Internship
//         </Link>
//       </div>

//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Filter by Year</h2>
//         <div className="flex space-x-4">
//           {["FIRST", "SECOND", "THIRD", "FOURTH"].map((year) => (
//             <label key={year} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name={year}
//                 checked={selectedYears[year as keyof YearState]}
//                 onChange={() => handleYearToggle(year as keyof YearState)}
//               />
//               <span>{year}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {filteredInternships.length === 0 && (
//         <div className="text-center py-10">
//           <p className="text-xl text-gray-600">No internship opportunities yet.</p>
//           <Link
//             href="/dashboard"
//             className="inline-block mt-4 text-blue-600 hover:underline"
//           >
//             Add your first internship
//           </Link>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredInternships.map((internship) => (
//           <InternshipCard key={internship.id} internship={internship} />
//         ))}
//       </div>
//     </main>
//   );
// }

import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
//import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import PostCard from "@/components/PostCard";


import { Suspense } from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import BlogCard from '@/components/BlogCard';
import InternshipCard from "@/components/InternshipCard";
import { Plus } from 'lucide-react';
import { getBlogs } from '@/actions/blog.action';
import {getInternships} from "@/actions/internship.action";
import InternshipList from "@/components/InternshipList";

import SearchClient from '@/components/SearchClient';

export default async function Home() {
  const user = await currentUser();
  const dbUserId = await getDbUserId();
  const internships = await getInternships();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        {user ? (
          <>
            <h1 className="text-4xl font-bold">Blog Posts</h1>
            <Link
              href="/create-internship"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create New Internship
            </Link>
          </>
        ) : null}
      </div>
      <h1 className="text-4xl font-bold mb-6">Internship Opportunities</h1>
      <InternshipList internships={internships} />

     
       
    </main>
  );
}

