import React, { useState } from 'react';
import { adopterPost } from '../../../../../api/postsApi';

const PostUpload = ({ userData }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(userData.status === "Approved") {
        await adopterPost({ id: userData.$id, content });
        setContent(""); // Clear input after submit
      }
      else {
        alert("Please verify before posting!")
      }
    } catch (error) {
      console.error("Error uploading post:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{
          padding: "8px",
          width: "300px",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "8px 16px",
          borderRadius: "4px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Uploading..." : "Upload POST"}
      </button>
    </form>
  );
};

export default PostUpload;
