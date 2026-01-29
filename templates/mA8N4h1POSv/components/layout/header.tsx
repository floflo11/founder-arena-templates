import { aboutFragment, infoFragment } from "@/lib/basehub";
import { basehub } from "basehub";
import React from "react";
import { HeaderLink } from "./link";
import { Contact } from "./contact";
import { MobileMenu } from "./mobile-menu";
import { TransitionTrigger } from "../transition-trigger";

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

export const Header = async () => {
  const { info } = await basehub().query({
    info: infoFragment,
    about: aboutFragment,
  });

  return (
    <header className="px-sides flex justify-between md:grid grid-cols-12 gap-gap h-header items-center sticky top-0 z-50 bg-background">
      <TransitionTrigger
        href="/"
        className={
          "text-subtitle col-span-5 font-black uppercase cursor-pointer w-max"
        }
      >
        <span>{info.title}</span>
      </TransitionTrigger>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 col-span-4">
        {links.map((item) => (
          <HeaderLink key={item.label} href={item.href}>
            {item.label}
          </HeaderLink>
        ))}
        <Contact info={info}>
          <button className="font-semibold text-subtitle transition-opacity duration-300 ease-quad-out opacity-30 hover:opacity-60">
            Contact
          </button>
        </Contact>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden col-span-4 justify-self-end">
        <MobileMenu info={info} />
      </div>

      <p
        className={
          "hidden md:block text-subtitle font-semibold col-span-3 justify-self-end opacity-30"
        }
      >
        {info.subtitle}
      </p>
    </header>
  );
};
