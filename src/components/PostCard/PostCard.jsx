import LikedButton from "../../assets/like.png";
import NotLikedButton from "../../assets/not-liked.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLikeContext } from "../../contexts/LikeContext";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./PostCard.css";
function PostCard({ id }) {
  const post = useSelector((store) =>
    store.posts.posts.find((post) => post.id === id)
  );
  const { likes, toggleLike } = useLikeContext();
  const isLiked = likes ? !!likes[id] : false;

  return (
    <div className="card post-card">
      <Link className="link" to={`/post/${post.id}`}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content.substring(0, 200)}...</p>
        </div>
      </Link>
      <div className="like-btn">
        {isLiked ? (
          <div onClick={() => toggleLike(post.id)}>
            <Icon url={LikedButton} text={"Dislike"} />
          </div>
        ) : (
          <div onClick={() => toggleLike(post.id)}>
            <Icon url={NotLikedButton} text={"Like"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
