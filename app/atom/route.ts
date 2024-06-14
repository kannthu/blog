import { getPosts } from "@/lib/get-posts";

export async function GET() {
  const posts = await getPosts();
  const max = 100; // max returned posts
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Dawid Moczadło</title>
    <subtitle>Essays</subtitle>
    <link href="https://moczadlo.com/atom" rel="self"/>
    <link href="https://moczadlo.com/"/>
    <updated>${posts[0].date}</updated>
    <id>https://moczadlo.com/</id>
    <author>
      <name>Dawid Moczadło</name>
      <email>dawid@vidocsecurity.com</email>
    </author>
    ${posts.slice(0, max).reduce((acc, post) => {
      const dateMatch = post.date.match(/\d{4}/);
      if (!dateMatch) return "";
      return `${acc}
        <entry>
          <id>${post.id}</id>
          <title>${post.title}</title>
          <link href="https://moczadlo.com/${dateMatch[0]}/${post.id}"/>
          <updated>${post.date}</updated>
        </entry>`;
    }, "")}
  </feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    }
  );
}
