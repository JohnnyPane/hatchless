import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import { Text } from "@mantine/core";
import PostCard from "./PostCard.jsx";

const PostList = () => {
  const { data: posts } = useResourceContext();

  return (
    <div className="flex column align-center">
      {posts.length === 0 ? (
        <Text mt="xl">No posts available.</Text>
      ) : (
        posts.map((post) => <div className="margin-bottom">
            <PostCard key={post.id} postData={post} />
          </div>
        )
      )}
    </div>
  );
}

export default PostList;