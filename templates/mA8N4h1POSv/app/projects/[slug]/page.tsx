import { ProjectItemFragment, projectsItemFragment } from "@/lib/basehub";
import { basehub } from "basehub";
import { RichText } from "basehub/react-rich-text";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Media } from "@/components/media";
import { NavigationButton } from "@/components/navigation-button";
import "@/basehub.config";

export const dynamic = "force-static";
export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { projects } = await basehub().query({
    projects: {
      __args: {
        filter: {
          _slug: {
            eq: slug,
          },
        },
        first: 1,
      },
      items: projectsItemFragment,
    },
  });

  const match = projects.items[0];

  if (!match) {
    return {
      title: "Not found",
      description: "Project not found",
    };
  }

  return {
    title: match._title,
    description: match.description.plainText,
    openGraph: {
      url: match.opengraphImage.url,
      images: [
        {
          url: match.opengraphImage.url,
          width: match.opengraphImage.width,
          height: match.opengraphImage.height,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { projects } = await basehub().query({
    projects: {
      __args: {
        filter: {
          _slug: {
            eq: slug,
          },
        },
        first: 1,
      },
      items: projectsItemFragment,
    },
  });

  const { projects: allProjects } = await basehub().query({
    projects: {
      items: {
        _slug: true,
      },
    },
  });

  const project = projects.items[0];

  if (!project) {
    return notFound();
  }

  const currentProjectIndex = allProjects.items.findIndex(
    (project) => project._slug === slug
  );

  const prevProjectSlug = allProjects.items[currentProjectIndex - 1]?._slug;
  const nextProjectSlug = allProjects.items[currentProjectIndex + 1]?._slug;

  return (
    <main className="px-sides my-24">
      <h1 className="text-heading font-black text-balance mb-12">
        {project._title}
      </h1>

      <div className="flex flex-col md:grid grid-cols-12 gap-6 md:gap-gap">
        <div className="col-span-5">
          <ProjectAttributes project={project} />
        </div>
        <div className="col-span-6 text-base leading-[1.2] font-semibold text-pretty">
          <RichText content={project.description.json.content} />
        </div>
      </div>

      {/* Media Grid */}
      {project.media.items.length > 0 && (
        <div className="space-y-gap mt-16">
          {(() => {
            const rows = [];
            let currentIndex = 0;
            let rowIndex = 0;
            
            while (currentIndex < project.media.items.length) {
              const isEvenRow = rowIndex % 2 === 0;
              const itemsPerRow = isEvenRow ? 2 : 3;
              const colSpan = isEvenRow ? "col-span-6" : "col-span-4";
              
              const rowItems = [];
              for (let i = 0; i < itemsPerRow && currentIndex < project.media.items.length; i++) {
                const mediaItem = project.media.items[currentIndex];
                rowItems.push(
                  <div key={currentIndex} className={colSpan}>
                    <Media
                      media={mediaItem.media}
                      className="rounded-[6px] aspect-square hover:rounded-[18px] transition-[border-radius] duration-500 ease-quad-out w-full h-auto"
                    />
                  </div>
                );
                currentIndex++;
              }
              
              rows.push(
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-12 gap-gap">
                  {rowItems}
                </div>
              );
              rowIndex++;
            }
            
            return rows;
          })()}
        </div>
      )}

      <div className="flex justify-between gap-gap mt-6 md:mt-12">
        <NavigationButton
          href={prevProjectSlug ? `/projects/${prevProjectSlug}` : undefined}
          variant="left"
        >
          Previous
        </NavigationButton>
        <NavigationButton href="/">Back</NavigationButton>
        <NavigationButton
          href={nextProjectSlug ? `/projects/${nextProjectSlug}` : undefined}
          variant="right"
        >
          Next
        </NavigationButton>
      </div>
    </main>
  );
}

const ProjectAttributes = ({ project }: { project: ProjectItemFragment }) => {
  const { year, client, category } = project;

  return (
    <div className="grid grid-cols-6 gap-x-gap space-y-4 text-base leading-[1.2] font-semibold">
      <div className="contents">
        <p className="opacity-30">Year</p>
        <p className="col-span-5">{year}</p>
      </div>

      {client && (
        <div className="contents">
          <p className="opacity-30">Client</p>
          <p className="col-span-5">{client.plainText}</p>
        </div>
      )}

      {category && category.length > 0 && (
        <div className="contents">
          <p className="opacity-30">Type</p>
          <p className="col-span-5">{category.join(", ")}</p>
        </div>
      )}
    </div>
  );
};
