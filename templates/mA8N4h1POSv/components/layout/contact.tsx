"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoFragment } from "@/lib/basehub";
import { Separator } from "@/components/ui/separator";

interface ContactProps {
  info: InfoFragment;
  children: React.ReactNode;
}

export const Contact = ({ info, children }: ContactProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="border-0 p-8 aspect-video flex flex-col justify-between gap-4 2x:gap-6 h-max bg-background rounded shadow-2xl z-50 duration-300 data-[state=open]:animate-contact-slide-in data-[state=closed]:animate-contact-slide-out"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Contact Information</DialogTitle>

        {/* Name and Title */}
        <div className="text-center">
          <h2 className="text-heading font-black">{info.title}</h2>
          <p className="text-lg font-medium text-foreground/70">
            {info.subtitle}
          </p>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-3 font-semibold text-base leading-[1.2] text-center">
          {info.phone && (
            <div>
              <a
                href={`tel:${info.phone}`}
                className="hover:opacity-70 transition-opacity"
              >
                {info.phone}
              </a>
            </div>
          )}

          {info.address && (
            <div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  info.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                {info.address}
              </a>
            </div>
          )}

          {info.email && (
            <div>
              <a
                href={`mailto:${info.email}`}
                className="hover:opacity-70 transition-opacity"
              >
                {info.email}
              </a>
            </div>
          )}

          {/* Social Links */}
          {info.socialLinks.items.length > 0 && (
            <div>
              <a
                href={info.socialLinks.items[0]?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                {info.socialLinks.items[0]?.link.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
