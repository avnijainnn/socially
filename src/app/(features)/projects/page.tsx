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

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        {/* Sidebar content if needed */}
      </div>
    </div>
  );
}