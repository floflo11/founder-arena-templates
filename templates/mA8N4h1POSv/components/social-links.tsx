import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

interface SocialLink {
  _title: string;
  link: string;
}

interface SocialLinksProps extends ComponentProps<"ul"> {
  links: SocialLink[];
}

export function SocialLinks({ links, className, ...props }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-col", className)} {...props}>
      {links.map((link, index) => (
        <Link
          className="text-subtitle font-semibold opacity-30 hover:opacity-100 transition-opacity duration-300 ease-quad-out"
          target="_blank"
          key={link._title}
          href={link.link}
        >
          {link._title}
          {index === 0 && (
            <span aria-hidden className="text-heading opacity-0">
              a
            </span>
          )}
        </Link>
      ))}
    </ul>
  );
}
