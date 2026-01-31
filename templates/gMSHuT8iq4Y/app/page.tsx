import Link from "next/link"
import { posts } from "./data/posts"

export default function Home() {
  const categories = ["Tech", "Art", "Finance"]

  return (
    <div>
      <h2 className="text-2xl font-pixel mb-6">Latest Pixelated Wisdom</h2>
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-pixel mb-4">{category}</h3>
          <div className="grid gap-6">
            {posts
              .filter((post) => post.category === category)
              .slice(0, 3)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <h4 className="text-lg font-pixel mb-2">{post.title}</h4>
                  <span className="inline-block px-2 py-1 bg-green-600 text-black text-sm font-mono rounded">
                    {post.category}
                  </span>
                </Link>
              ))}
          </div>
          <Link href={`/category/${category.toLowerCase()}`} className="inline-block mt-4 font-pixel text-sm underline">
            See all {category} posts
          </Link>
        </div>
      ))}
    </div>
  )
}
