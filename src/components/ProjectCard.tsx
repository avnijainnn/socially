// 'use client';
// import React from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Github, ExternalLink } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { formatDistanceToNow } from "date-fns";
// import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
// import toast from "react-hot-toast";
// import { getProjects } from "@/actions/project.action";

// type Projects = Awaited<ReturnType<typeof getProjects>>;
// type Project = Projects[number];

// export default function ProjectCard({ project  }: {project : Project}) {
    
//   return (
//     <Card className="shadow-lg rounded-2xl relative">
//       <CardHeader>
//       </CardHeader>
//       <CardContent className="p-6">
//         <h2 className="text-2xl font-semibold">{project.title}</h2>
//         <p className="text-gray-600 my-2">{project.description}</p>
//         {project.collaboration && (
//           <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
//             Needs Collaborators
//           </Badge>
//         )}
//         <div className="flex gap-3 mt-4">
//           {project.collaboration && project.github && (
//             <Button variant="outline" asChild>
//               <a href={project.github} target="_blank" rel="noopener noreferrer">
//                 <Github className="mr-2" /> GitHub
//               </a>
//             </Button>
//           )}
//           {project.live && (
//             <Button asChild>
//               <a href={project.live} target="_blank" rel="noopener noreferrer">
//                 <ExternalLink className="mr-2" /> Live Demo
//               </a>
//             </Button>
//           )}
//         </div>
        
//       </CardContent>
//     </Card>
//   );
// }


'use client';
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import toast from "react-hot-toast";
import { getProjects } from "@/actions/project.action";
import { motion } from "framer-motion";

type Projects = Awaited<ReturnType<typeof getProjects>>;
type Project = Projects[number];

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-lg rounded-2xl relative">
        <CardHeader>
        </CardHeader>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold">{project.title}</h2>
          <p className="text-gray-600 my-2">{project.description}</p>
          {project.collaboration && (
            <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
              Needs Collaborators
            </Badge>
          )}
          <div className="flex gap-3 mt-4">
            {project.collaboration && project.github && (
              <Button variant="outline" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2" /> GitHub
                </a>
              </Button>
            )}
            {project.live && (
              <Button asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}