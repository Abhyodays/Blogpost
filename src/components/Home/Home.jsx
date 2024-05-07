import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import "./Home.css";
import NoPost from "../NoPost/NoPost";
import PostCard from "../PostCard/PostCard";
function Home() {
  const posts = useSelector((state) => state.posts.posts);
  return (
    <div className="body">
      <div className="home">
        <div className="new-post-container">
          <Link to="/create-post">
            <button className="btn btn-black new-post">New Post</button>
          </Link>
        </div>
        <div className="post-container">
          {posts.map((post) => (
            <PostCard key={post.id} id={post.id} />
          ))}
          {posts.length === 0 && <NoPost />}
        </div>
      </div>
    </div>
  );
}

export default Home;
