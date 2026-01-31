import { basehub } from "basehub"
import { Intro } from "./components/intro"
import { HeroPost, PostMetaFragment } from "./components/hero-post"
import { MoreStories } from "./components/more-stories"
import { Newsletter } from "./components/newsletter"
import type { Metadata } from "next"
import "../basehub.config"

export const dynamic = "force-static"
export const revalidate = 30

export async function generateMetadata(): Promise<Metadata> {
  const data = await basehub().query({
    meta: {
      title: true,
      description: true,
      ogImage: {
        url: true,
      },
    },
  })

  return {
    title: data.meta?.title || `BaseHub x v0 Example`,
    description: data.meta?.description || `This is a blog built with BaseHub and v0.`,
    generator: "v0.dev",
    openGraph: {
      title: data.meta?.title || `BaseHub x v0 Example`,
      description: data.meta?.description || `This is a blog built with BaseHub and v0.`,
      images: data.meta?.ogImage?.url
        ? [
            {
              url: data.meta.ogImage.url,
              width: 1200,
              height: 630,
              alt: data.meta?.title || `BaseHub x v0 Example`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta?.title || `BaseHub x v0 Example`,
      description: data.meta?.description || `This is a blog built with BaseHub and v0.`,
      images: data.meta?.ogImage?.url ? [data.meta.ogImage.url] : [],
    },
  }
}

export default async function Page() {
  const data = await basehub().query({
    blog: {
      morePosts: true,
      posts: {
        __args: { orderBy: "date__DESC" },
        items: PostMetaFragment,
      },
    },
    newsletter: {
      subscribers: {
        ingestKey: true,
        schema: true,
      },
    },
  })

  const heroPost = data.blog.posts.items[0]
  const morePosts = data.blog.posts.items.slice(1)

  return (
    <main>
      <section className="container mx-auto px-5">
        <Intro />
        {heroPost && <HeroPost {...heroPost} />}
        <MoreStories morePosts={morePosts} title={data.blog.morePosts} />
      </section>
      <Newsletter newsletter={data.newsletter.subscribers} />
    </main>
  )
}
