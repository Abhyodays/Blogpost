import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLikeContext } from "../../contexts/LikeContext";
import Icon from "../Icon/Icon";
import Like from "../../assets/like.png";
import Dislike from "../../assets/not-liked.png";
import Delete from "../../assets/delete.png";
import Edit from "../../assets/edit.png";
import "./PostDetails.css";
import { deletePost } from "../../redux/postSlice";
function PostDetails() {
  const { id } = useParams();
  const { likes, toggleLike } = useLikeContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((store) =>
    store.posts.posts.find((post) => post.id === id)
  );
  const isLiked = likes ? !!likes[post.id] : false;
  const handleDelete = () => {
    dispatch(deletePost(id));
    navigate("/");
  };
  return (
    <div className="body">
      <div className="post">
        <div className="post-head">
          <div className="post-title">
            <h3 className="title">{post.title}</h3>
            <span className="category">{post.category}</span>
          </div>
          <div className="post-control">
            <div onClick={() => toggleLike(post.id)}>
              {isLiked ? (
                <Icon url={Like} text={"Dislike"} />
              ) : (
                <Icon url={Dislike} text={"Like"} />
              )}
            </div>
            <div>
              <Link className="link" to={`/edit/${post.id}`}>
                <Icon url={Edit} text={"Edit"} />
              </Link>
            </div>
            <div onClick={handleDelete}>
              <Icon url={Delete} text={"Delete"} />
            </div>
          </div>
        </div>
        <div className="post-body">{post.content}</div>
      </div>
    </div>
  );
}
export default PostDetails;
