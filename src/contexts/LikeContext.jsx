import { createContext, useState, useContext, useEffect } from "react";

const LikeContext = createContext();

export function useLikeContext() {
  return useContext(LikeContext);
}

export function LikeProvider({ children }) {
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem("likes");
    return storedLikes ? JSON.parse(storedLikes) : {};
  });

  // load likes on changes in likes
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  function toggleLike(postId) {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  }
  function deleteLike(postId) {
    const updatedLikes = { ...likes };
    delete updatedLikes[postId];
    setLikes(updatedLikes);
  }

  return (
    <LikeContext.Provider value={{ likes, toggleLike, deleteLike }}>
      {children}
    </LikeContext.Provider>
  );
}
