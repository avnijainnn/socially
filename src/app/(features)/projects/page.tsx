import { motion } from "framer-motion";
import { getDbUserId } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
//import SearchForm from "@/components/SearchForm";
import { getProjects } from "@/actions/project.action";
import CreateProject from "@/components/CreateProject";
import ProjectCard from "@/components/ProjectCard";

export default async function Home() {
  const user = await currentUser();
  const projects = await getProjects();
  //const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreateProject /> : null}

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4">
        <div className="sticky top-20 space-y-6">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Projects</span>
                <span className="font-medium">{projects.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        {/* Sidebar content if needed */}
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Plus } from 'lucide-react';
// import { getProjects } from "@/actions/project.action";
// import CreateProject from "@/components/CreateProject";
// import ProjectCard from "@/components/ProjectCard";
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";

// export default function Home() {
//   const [projects, setProjects] = useState<any[]>([]);
//   const [notification, setNotification] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         <div className="lg:col-span-8">
//           <div className="bg-card rounded-lg p-6 mb-8">
//             <h1 className="text-3xl font-bold mb-2">Projects</h1>
//             <p className="text-muted-foreground mb-6">
//               Discover and share amazing projects with the community
//             </p>

//               <div>
//                 <CreateProject />
//               </div>

//           </div>

//           {notification && (
//             <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
//               {notification}
//             </div>
//           )}

//           <div className="grid gap-6">
//             {projects.map((project) => (
//               <div key={project.id}>
//                 <ProjectCard project={project} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="hidden lg:block lg:col-span-4">
//           <div className="sticky top-20 space-y-6">
//             <div className="bg-card rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Total Projects</span>
//                   <span className="font-medium">{projects.length}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
