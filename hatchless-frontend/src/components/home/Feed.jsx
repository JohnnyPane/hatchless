import { useNavigate } from "react-router-dom";
import { Button } from '@mantine/core'
import { useMe } from "../../hooks/useMe.js";
import PostList from "../posts/PostList.jsx";

const Feed = () => {
  const navigate = useNavigate();
  const { data: me } = useMe();

  return (
    <div className="page">
      <div className="flex column to-center margin-bottom">
        {me && <Button variant="light" color="indigo" onClick={() => navigate('/posts/create')}>
          Have something to share? Create a Post!
        </Button>}

        <div className="margin-top">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Feed;