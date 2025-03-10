// import { currentUser } from "@clerk/nextjs/server";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { SignInButton, SignUpButton } from "@clerk/nextjs";
// import { Button } from "./ui/button";
// import { getUserByClerkId } from "@/actions/user.action";
// import Link from "next/link";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Separator } from "./ui/separator";
// import { LinkIcon, MapPinIcon } from "lucide-react";

// async function Sidebar() {
//   const authUser = await currentUser();
//   if (!authUser) return <UnAuthenticatedSidebar />;

//   const user = await getUserByClerkId(authUser.id);
//   if (!user) return null;

//   return (
//     <div className="sticky top-20">
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col items-center text-center">
//             <Link
//               href={`/profile/${user.username}`}
//               className="flex flex-col items-center justify-center"
//             >
//               <Avatar className="w-20 h-20 border-2 ">
//                 <AvatarImage src={user.image || "/avatar.png"} />
//               </Avatar>

//               <div className="mt-4 space-y-1">
//                 <h3 className="font-semibold">{user.name}</h3>
//                 <p className="text-sm text-muted-foreground">{user.username}</p>
//               </div>
//             </Link>

//             {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}

//             <div className="w-full">
//               <Separator className="my-4" />
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-medium">ODVS</p>
//                   <p className="text-xs text-muted-foreground">SDVOIHSV=</p>
//                 </div>
//                 <Separator orientation="vertical" />
//                 <div>
//                   <p className="font-medium">DOUV</p>
//                   <p className="text-xs text-muted-foreground">FUHRVSPVI</p>
//                 </div>
//               </div>
//               <Separator className="my-4" />
//             </div>

//             <div className="w-full space-y-2 text-sm">
//               <div className="flex items-center text-muted-foreground">
//                 <MapPinIcon className="w-4 h-4 mr-2" />
//                 {user.location || "No location"}
//               </div>
//               <div className="flex items-center text-muted-foreground">
//                 <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
//                 {user.website ? (
//                   <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
//                     {user.website}
//                   </a>
//                 ) : (
//                   "No website"
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Sidebar;
import React from 'react';
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  LinkIcon, 
  MapPinIcon, 
  UserCircle, 
  Briefcase, 
  Calendar, 
  HelpCircle,
  ChevronRight, 
  Rocket
} from "lucide-react";
import Link from "next/link";
import { getUserByClerkId } from '@/actions/user.action';


interface FeatureLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureLink = ({ href, icon: Icon, title, description }: FeatureLinkProps) => (
  <Link 
    href={href}
    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
  </Link>
);

const Features = () => (
  <div className="w-full space-y-2">
    <FeatureLink 
      href="/internships"
      icon={Briefcase}
      title="Internship Opportunities"
      description="Find your next internship"
    />
    <FeatureLink 
      href = "/projects"
      icon = {Rocket}
      title = "Projects"
      description = "Explore projects"
    />
    
    <FeatureLink 
      href="/advice"
      icon={HelpCircle}
      title="Advice Hub"
      description="Get career guidance"
    />
  </div>
);

interface User {
  location?: string | null;
  website?: string | null;
}

const UserInfo = ({ user }: { user: User }) => (
  <div className="w-full space-y-2 text-sm">
    <div className="flex items-center text-muted-foreground">
      <MapPinIcon className="w-4 h-4 mr-2" />
      <span className="truncate">{user.location || "No location"}</span>
    </div>
    <div className="flex items-center text-muted-foreground">
      <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
      {user.website ? (
        <a 
          href={user.website}
          className="hover:underline truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      ) : (
        "No website"
      )}
    </div>
  </div>
);

const Sidebar = async () => {
  const authUser = await currentUser();
  
  if (!authUser) {
    return <UnAuthenticatedSidebar />;
  }

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center group"
            >
              <Avatar className="w-20 h-20 border-2 transition-transform group-hover:scale-105">
                <AvatarImage src={user.image ?? "/avatar.png"} alt={user.name ?? "User"} />
                <AvatarFallback>
                  <UserCircle className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {user.name}
                </h3>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <UserInfo user={user} />
            
            <Separator className="my-4" />
            
            <Features />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);
