import React, { useState, useEffect } from 'react';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;
    
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error}</div>;
  if (comments.length === 0) return <div>No comments available for this post.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Comments for Post {postId}</h2>
      <ul className="mt-4 space-y-2">
        {comments.map(comment => (
          <li key={comment.id} className="border p-2">
            <p><strong>{comment.name}</strong></p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
