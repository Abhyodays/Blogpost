import CreatePost from "./components/CreatePost/CreatePost";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetails from "./components/PostDetails/PostDetails";
import EditPost from "./components/EditPost/EditPost";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/create-post" Component={CreatePost} />
        <Route path="/post/:id" Component={PostDetails} />
        <Route path="/edit/:id" Component={EditPost} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
