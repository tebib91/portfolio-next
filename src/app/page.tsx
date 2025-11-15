import { BackgroundGrid } from "@/components/background-grid";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { FloatingDockDemo } from "@/components/ui/dock";
import { HomeIcon, MailIcon, UserIcon } from "lucide-react";

export default function Home() {
  const dockItems = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      label: "About",
      href: "/about",
      icon: <UserIcon />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <MailIcon />,
    },
  ]
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black relative">
      
      <header className="absolute top-2 right-2 z-10"  ><ModeToggle /></header>
      <main className=" items-center justify-center w-full h-full">
        <BackgroundGrid />
      </main>
      <footer className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10"><FloatingDockDemo /></footer>

    </div>  
  );
}
