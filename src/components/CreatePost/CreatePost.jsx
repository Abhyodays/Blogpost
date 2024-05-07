import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";

import "./CreatePost.css";
function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    content: "",
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
    const id = uuidv4();
    if (!validatePost(formData.title, formData.category, formData.content)) {
      return;
    }
    const newPost = {
      id,
      title: formData.title.trim(),
      category: formData.category.trim(),
      content: formData.content.trim(),
    };
    dispatch(createPost(newPost));
    setFormData({ id: "", title: "", category: "", content: "" });
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
      <h2>Create Post</h2>
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
          <input type="submit" className="btn btn-success" value="Create" />
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

export default CreatePost;
