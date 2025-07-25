import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case "forYou":
        return `${import.meta.env.VITE_API_URL}/api/post/all`;
      case "following":
        return "${import.meta.env.VITE_API_URL}/api/post/following";
      case "posts":
        return `${import.meta.env.VITE_API_URL}/api/post/user/${username}`;
      case "likes":
        return `${import.meta.env.VITE_API_URL}/api/post/likes/${userId}`;
      default:
        return `${import.meta.env.VITE_API_URL}/api/post/all`;
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["postsKey"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT, { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, username, refetch]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && data?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && !isRefetching && data && (
        <div>
          {data.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
