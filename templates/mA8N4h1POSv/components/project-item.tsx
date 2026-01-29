import { ProjectItemFragment } from "@/lib/basehub";
import { cn } from "@/lib/utils";
import { Media } from "./media";
import { TransitionTrigger } from "./transition-trigger";

interface ProjectItemProps {
  project: ProjectItemFragment;
  mode: "featured" | "grid";
  className?: string;
}

export function ProjectItem({ project, mode, className }: ProjectItemProps) {
  const firstMedia = project.media.items[0]?.media;

  return (
    <TransitionTrigger
      href={`/projects/${project._slug}`}
      className={cn(
        className,
        "group block relative overflow-hidden bg-muted rounded-[6px] hover:rounded-[18px] transition-[border-radius] duration-300 ease-quad-out w-full cursor-pointer",
        mode === "featured" ? "aspect-video" : "aspect-square"
      )}
    >
      {firstMedia ? (
        <Media
          media={firstMedia}
          alt={project._title}
          className="size-full object-cover transition-transform duration-500 ease-quad-out group-hover:scale-[1.025]"
          quality={100}
          sizes={
            mode === "featured"
              ? "100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          priority={mode === "featured"}
          videoProps={{
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            className:
              "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-quad-out group-hover:scale-[1.025]",
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground">No media</span>
        </div>
      )}

      <div
        className={cn(
          "pt-4 absolute bottom-2 right-2 left-2 rounded-lg bg-muted px-3 md:px-4 py-2 md:py-3",
          mode === "featured"
            ? "md:left-[unset] md:min-w-[calc(33vw-var(--gap)*2)]"
            : "md:opacity-0 md:group-hover:opacity-100 transition-all ease-quad-out duration-300 scale-[.98] md:translate-y-full group-hover:-translate-y-0 group-hover:scale-100 filter-blur-md group-hover:filter-blur-none"
        )}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "font-black text-left text-lg md:text-2xl group-hover:text-primary",
              mode === "featured"
                ? "line-clamp-2 text-lg md:text-2xl"
                : "line-clamp-1 text-lg md:text-xl"
            )}
          >
            {project._title}
          </h3>
          {project.category && project.category.length > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              <p
                className={cn(
                  "text-foreground/30 font-semibold text-sm md:text-base"
                )}
              >
                {project.category[0]}
              </p>
              {project.category.length > 1 && (
                <span
                  className={cn(
                    "text-foreground/10 font-semibold text-sm md:text-base"
                  )}
                >
                  +{project.category.length - 1}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </TransitionTrigger>
  );
}
