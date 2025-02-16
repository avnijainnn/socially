// "use client";

// import {
//   BellIcon,
//   HomeIcon,
//   LogOutIcon,
//   MenuIcon,
//   MoonIcon,
//   SunIcon,
//   UserIcon,
//   Briefcase,
//   Calendar,
//   HelpCircle,
//   Rocket
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useState } from "react";
// import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
// import { useTheme } from "next-themes";
// import Link from "next/link";

// function MobileNavbar() {
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const { isSignedIn } = useAuth();
//   const { theme, setTheme } = useTheme();

//   const navigationItems = [
//     {
//       href: "/",
//       icon: HomeIcon,
//       label: "Home",
//     },
//     {
//       href: "/projects",
//       icon: Rocket,
//       label: "Projects",
//       requireAuth: true,
//     },
//     {
//       href: "/internships",
//       icon: Briefcase,
//       label: "Internships",
//       requireAuth: true,
//     },
//     {
//       href: "/events",
//       icon: Calendar,
//       label: "Tech Events",
//       requireAuth: true,
//     },
//     {
//       href: "/advice",
//       icon: HelpCircle,
//       label: "Advice Hub",
//       requireAuth: true,
//     },
//     {
//       href: "/notifications",
//       icon: BellIcon,
//       label: "Notifications",
//       requireAuth: true,
//     },
//     {
//       href: "/profile",
//       icon: UserIcon,
//       label: "Profile",
//       requireAuth: true,
//     },
//   ];

//   return (
//     <div className="flex md:hidden items-center space-x-2">
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//         className="mr-2"
//       >
//         <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//         <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//         <span className="sr-only">Toggle theme</span>
//       </Button>

//       <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
//         <SheetTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <MenuIcon className="h-5 w-5" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className="w-[300px]">
//           <SheetHeader>
//             <SheetTitle>Menu</SheetTitle>
//           </SheetHeader>
//           <nav className="flex flex-col space-y-4 mt-6">
//             {navigationItems.map((item) => (
//               (!item.requireAuth || isSignedIn) && (
//                 <Button
//                   key={item.href}
//                   variant="ghost"
//                   className="flex items-center gap-3 justify-start"
//                   asChild
//                 >
//                   <Link href={item.href}>
//                     <item.icon className="w-4 h-4" />
//                     {item.label}
//                   </Link>
//                 </Button>
//               )
//             ))}

//             {isSignedIn ? (
//               <SignOutButton>
//                 <Button
//                   variant="ghost"
//                   className="flex items-center gap-3 justify-start w-full"
//                 >
//                   <LogOutIcon className="w-4 h-4" />
//                   Logout
//                 </Button>
//               </SignOutButton>
//             ) : (
//               <SignInButton mode="modal">
//                 <Button variant="default" className="w-full">
//                   Sign In
//                 </Button>
//               </SignInButton>
//             )}
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// export default MobileNavbar;

"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  Briefcase,
  Calendar,
  HelpCircle,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useAuth, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const [profilePath, setProfilePath] = useState("");

  useEffect(() => {
    if (user) {
      const username = user.username ?? user.emailAddresses[0].emailAddress.split("@")[0];
      setProfilePath(`/profile/${username}`);
    }
  }, [user]);

  const navigationItems = [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home",
    },
    {
      href: "/projects",
      icon: Rocket,
      label: "Projects",
      requireAuth: true,
    },
    {
      href: "/internships",
      icon: Briefcase,
      label: "Internships",
      requireAuth: true,
    },
    {
      href: "/events",
      icon: Calendar,
      label: "Tech Events",
      requireAuth: true,
    },
    {
      href: "/advice",
      icon: HelpCircle,
      label: "Advice Hub",
      requireAuth: true,
    },
    {
      href: "/notifications",
      icon: BellIcon,
      label: "Notifications",
      requireAuth: true,
    },
    {
      href: () => profilePath,
      icon: UserIcon,
      label: "Profile",
      requireAuth: true,
    },
  ];

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            {navigationItems.map((item) => (
              (!item.requireAuth || isSignedIn) && (
                <Button
                  key={typeof item.href === 'function' ? item.href() : item.href}
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={typeof item.href === 'function' ? item.href() : item.href}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            ))}

            {isSignedIn ? (
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start w-full"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;