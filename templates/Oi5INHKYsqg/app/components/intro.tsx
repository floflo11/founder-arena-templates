import { CMS_NAME, CMS_URL } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A blog example using{" "}
        <a
          href="https://v0.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-500 duration-200 transition-colors"
        >
          v0
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-500 duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
}
