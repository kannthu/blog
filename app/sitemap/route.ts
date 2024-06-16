import { SitemapStream, streamToPromise } from "sitemap";
import { getPosts } from "@/lib/get-posts";

export async function GET() {
  try {
    const smStream = new SitemapStream({
      hostname: `https://moczadlo.com`,
    });

    const posts = await getPosts();

    // Create each URL row
    posts.forEach(post => {
      smStream.write({
        url: `/${new Date(post.date).getFullYear()}/${post.id}`,
        changefreq: "weekly",
        priority: 0.9,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    return new Response(sitemapOutput, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
    // Display output to user
  } catch (e) {
    console.log(e);
    return new Response("Something went wrong.", {
      status: 500,
    });
  }
}
