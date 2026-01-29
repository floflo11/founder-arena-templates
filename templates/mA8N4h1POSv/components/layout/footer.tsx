import { infoFragment } from "@/lib/basehub";
import { basehub } from "basehub";
import React from "react";
import { ContactItem } from "./contact-item";
import { SocialLinks } from "../social-links";

export const Footer = async () => {
  const { info } = await basehub().query({
    info: infoFragment,
  });

  return (
    <footer className="px-sides flex flex-col lg:grid grid-cols-12 gap-6 lg:gap-gap py-12">
      <SocialLinks links={info.socialLinks.items} className="col-span-3" />
      <div className="col-span-9 flex flex-col space-y-4 lg:space-y-0">
        <ContactItem
          label="Email"
          value={info.email}
          href={`mailto:${info.email}`}
          ariaLabel="Email link"
        />
        {info.phone && (
          <ContactItem
            label="Phone"
            value={info.phone}
            href={`tel:${info.phone}`}
            ariaLabel="Phone link"
          />
        )}
        <p className="text-subtitle font-semibold opacity-30 mt-12">
          © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
