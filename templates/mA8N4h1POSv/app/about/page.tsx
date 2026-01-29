import { Media } from "@/components/media";
import { aboutFragment } from "@/lib/basehub";
import { basehub } from "basehub";
import { RichText, type RichTextNode } from "basehub/react-rich-text";
import { Metadata } from "next";
import "@/basehub.config";


export const dynamic = "force-static";
export const revalidate = 30;

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const { about } = await basehub().query({
    about: aboutFragment,
  });
  return (
    <main className="px-sides my-24 min-h-fold">
      <h1 className="lg:hidden text-heading font-black uppercase text-balance mb-6">
        About
      </h1>
      <div className="flex flex-col lg:grid grid-cols-12 gap-gap">
        <div className="col-span-5">
          <Media
            media={about.aboutPhoto}
            alt={(originalAlt) => originalAlt || "About photo"}
            className="w-full h-auto rounded"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority
          />
        </div>
        <div className="col-span-7 flex flex-col py-2">
          <h1 className="sr-only">About</h1>
          <div className="flex flex-col divide-y divide-border">
            <AboutSection title="Bio" richText={about.bio} />
            <AboutSection title="Awards" richText={about.awards} />
            <AboutSection title="Clients" richText={about.clients} />
          </div>
        </div>
      </div>
    </main>
  );
}

const AboutSection = ({
  title,
  richText,
}: {
  title: string;
  richText: { json: { content: RichTextNode[] } };
}) => {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-7 gap-gap py-3 first:pt-0 last:pb-0">
      <h2 className="text-subtitle font-semibold opacity-30 lg:col-span-2">
        {title}
      </h2>
      <div className="col-span-3 lg:col-span-4">
        <div className="text-base leading-[1.2] font-semibold text-balance">
          <RichText content={richText.json.content} />
        </div>
      </div>
    </div>
  );
};
