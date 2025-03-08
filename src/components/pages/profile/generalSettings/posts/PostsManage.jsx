import React, { useState, useEffect } from 'react';
import { deletePostById, getPostsByAdopterId } from '../../../../../api/postsApi';

const PostsManage = ({userData}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {        
        if(userData.status !== "Approved") {
            setError("User not approved yet!");
            return;
        }
        const response = await getPostsByAdopterId(userData.$id);
        // Assuming the API returns an object with a `documents` property containing the posts.
        setPosts(response.documents);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData.adopterId]);

  const handleDelete = async (postId) => {
    // Mark post as deleting
    setDeleting((prev) => ({ ...prev, [postId]: true }));
    try {
      await deletePostById(postId);
      // Remove deleted post from the state
      setPosts((prev) => prev.filter((post) => post.$id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if(error) {
    return <span>Error: {error}</span>
  }

  return (
    <div>
      <h2>Adopter Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.$id}>
              {post.content}
              <button
                onClick={() => handleDelete(post.$id)}
                disabled={deleting[post.$id]}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: deleting[post.$id] ? "#ccc" : "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: deleting[post.$id] ? "not-allowed" : "pointer"
                }}
              >
                {deleting[post.$id] ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};

export default PostsManage;
