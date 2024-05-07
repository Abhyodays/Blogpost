import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../redux/postSlice";

function EditPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === id)
  );
  const [formData, setFormData] = useState({
    id: post.id,
    title: post.title,
    category: post.category,
    content: post.content,
  });
  const [errors, setErrors] = useState([]);

  const validatePost = (title, category, content) => {
    let flag = true;
    let updatedErrors = [];
    if (title.trim() === "") {
      flag = false;
      updatedErrors = [...updatedErrors, "Title field is empty."];
    }
    if (category.trim() === "") {
      flag = false;
      updatedErrors = [...updatedErrors, "Category field is empty."];
    }
    if (content.trim() === "") {
      flag = false;
      updatedErrors = [...updatedErrors, "Content field is empty."];
    }
    setErrors(updatedErrors);
    return flag;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validatePost(formData.title, formData.category, formData.content)) {
      return;
    }
    const newPost = {
      id: formData.id,
      title: formData.title.trim(),
      category: formData.category.trim(),
      content: formData.content.trim(),
    };
    dispatch(editPost(newPost));
    navigate("/");
  };
  const handleReset = () => {
    setFormData({ title: "", category: "", content: "" });
  };
  return (
    <div className="body">
      <Link to="/" className="return">
        home
      </Link>
      <h2>Edit Post</h2>
      <form className="post-form" onSubmit={handleSubmit} onReset={handleReset}>
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="Category">
          Category
        </label>
        <input
          type="text"
          id="Category"
          className="form-control"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <label className="form-label" htmlFor="content">
          Content
        </label>
        <textarea
          type="text"
          id="content"
          name="content"
          className="form-control"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <div className="btn-container">
          <input type="submit" className="btn btn-black" value="Save" />
          <input type="reset" className="btn btn-danger" value="Reset" />
        </div>
        <div className="error-container">
          {errors.map((error) => (
            <p key={error} className="text-danger">
              {error}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
}

export default EditPost;
