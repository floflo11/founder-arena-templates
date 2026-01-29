"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoFragment } from "@/lib/basehub";
import { Contact } from "./contact";
import { SocialLinks } from "../social-links";
import { TransitionTrigger } from "../transition-trigger";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

interface MobileMenuProps {
  info: InfoFragment;
}

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const MobileMenu = ({ info }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    // Close menu when switching from mobile to desktop
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="font-black text-subtitle uppercase">
        Menu
      </DialogTrigger>
      <DialogContent
        className="md:hidden dark px-sides flex flex-col border-0 text-foreground inset-0 w-full max-w-none max-h-none rounded-none z-50 duration-300 data-[state=open]:animate-menu-slide-in data-[state=closed]:animate-menu-slide-out"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Navigation Menu</DialogTitle>

        {/* Close Button */}
        <header className="flex w-full justify-between items-center h-header">
          <TransitionTrigger
            href="/"
            variant="down"
            className={"text-subtitle col-span-5 font-black uppercase"}
            onClick={() => setOpen(false)}
          >
            {info.title}
          </TransitionTrigger>

          <DialogClose className="font-black text-subtitle uppercase">
            Close
          </DialogClose>
        </header>
        <div className="flex-1 flex flex-col justify-between items-start py-12">
          {/* Navigation Links */}
          <nav className="">
            {links.map((link) => (
              <div key={link.label}>
                <TransitionTrigger
                  href={link.href}
                  variant="down"
                  className="block text-6xl font-black uppercase hover:opacity-70 transition-opacity"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </TransitionTrigger>
              </div>
            ))}
            <div>
              <Contact info={info}>
                <button className="text-6xl font-black uppercase hover:opacity-70 transition-opacity">
                  Contact
                </button>
              </Contact>
            </div>
          </nav>

          {/* Footer */}
          <SocialLinks links={info.socialLinks.items} />

          <p className="text-subtitle font-semibold opacity-30 mt-12">
            © 2025. All rights reserved.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
