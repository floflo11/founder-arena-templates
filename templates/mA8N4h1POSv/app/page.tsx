import { basehub } from "basehub";
import { infoFragment, projectsItemFragment } from "@/lib/basehub";
import { SocialLinks } from "@/components/social-links";
import { ProjectItem } from "@/components/project-item";
import "@/basehub.config";

export const dynamic = "force-static";
export const revalidate = 30;

export default async function Home() {  
  const { info, projects } = await basehub().query({
    info: infoFragment,
    projects: {
      items: projectsItemFragment,
    },
  });

  return (
    <main className="px-sides mb-24">
      {/* hero section */}
      <div className="pt-24 lg:pt-48 flex flex-col lg:grid grid-cols-12 gap-gap">
        <SocialLinks
          className="max-lg:hidden col-span-5"
          links={info.socialLinks.items}
        />
        <div className="col-span-7">
          <h1 className="text-heading font-black uppercase text-balance">
            {info.heading}
          </h1>
        </div>
      </div>

      {/* showcase section */}
      {projects.items.length > 0 && (
        <section className="pt-24">
          {/* featured project */}
          <div className="mb-12">
            <ProjectItem project={projects.items[0]} mode="featured" />
          </div>

          {/* grid projects */}
          {projects.items.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gap">
              {projects.items.slice(1).map((project) => (
                <ProjectItem
                  key={project._slug}
                  project={project}
                  mode="grid"
                />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
