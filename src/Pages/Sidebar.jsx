import { Sidebar, SidebarBody, SidebarLink } from "../Components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconClipboardText,
  IconIdBadge2,
  IconLayoutDashboard,
  IconShieldStar,
} from "@tabler/icons-react";
import { FaRegUserCircle } from "react-icons/fa";
import { cn } from "/lib/utils";
import { motion } from "motion/react";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function SidebarDemo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  motion;
  const links = [
    {
      label: "Home",
      to: "/",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    
    {
      label: "AddTask",
      to: "/addtask",
      icon: (
        <IconClipboardText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    
    {
      label: "All Tasks",
      to: "/alltasks",
      icon: (
        <IconClipboardText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Login/Signup",
      to: "/authForm",
      icon: (
        <FaRegUserCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "AdminDashboard",
      to: "/admindashboard",
      icon: (
        <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

    {
      label: "ProfilePage",
      to: "/profilepage",
      icon: (
        <IconIdBadge2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Page404",
      to: "*",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "  mx-auto flex h-screen  w-full flex-1 flex-col overflow-hidden  rounded-md border border-neutral-200  md:flex-row "
      )}
    >
      <Sidebar open={open} setOpen={setOpen} className="p-1 bg-light h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[280px] shrink-0 justify-between gap-10"  >
        <SidebarBody className="justify-between gap-10 px-3" >
          <div className="flex flex-1 flex-col   overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} to={link.to} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Settings",
                to: "/profilepage",
                icon: (
                   <img
                   src={user?.imageURL || user?.photoURL || "/default-user.png"}

                  className="h-7 w-7 shrink-0 rounded-full"
                  width={60}
                  height={60}
                  alt="User Avatar"
                />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full h-full overflow-auto  text-white bg-black ">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <>
      <div className="flex items-center justify-start mb-5">
        <IconShieldStar className="h-10 w-7 shrink-0 text-neutral-700 dark:text-neutral-200" />
        SHEILD
      </div>
    </>
  );
};

export const LogoIcon = () => {
  return (
    <>
      <div className="flex items-center justify-start mb-5">
        <IconShieldStar className="h-10 w-7 shrink-0 text-neutral-700 dark:text-neutral-200" />
        SHEILD
      </div>
    </>
  );
};
