import postsData from "./posts.json";
import redis from "./redis";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
  views: number;
  viewsFormatted: string;
};

// shape of the HSET in redis
type Views = {
  [key: string]: string;
};

export const getPosts = async () => {
  if ("development" === process.env.NODE_ENV) {
    return postsData.posts.map(post => ({
      ...post,
      views: 0,
      viewsFormatted: "0",
    }));
  }
  let allViews: null | Views = {};

  try {
    allViews = await redis.hgetall("views");
  } catch {}

  const posts = postsData.posts.map((post): Post => {
    const views = Number(allViews?.[post.id] ?? 0);
    return {
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    };
  });
  return posts;
};
