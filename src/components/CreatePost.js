import React, { useState } from 'react';

const CreatePost = ({ user, setCreatedPost, onGoBack }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormValid = title.trim() && body.trim();

  const handleCreatePost = () => {
    if (!isFormValid) return;

    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId: user.id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setResponse(data);
        setLoading(false);
        setCreatedPost(data);
      })
      .catch(error => {
        setError('Failed to create post');
        setLoading(false);
      });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create a Post for {user.name}</h2>
      <input
        type="text"
        className="border p-2 mb-4 w-full rounded-lg"
        placeholder="Post Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 mb-4 w-full rounded-lg"
        placeholder="Post Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      ></textarea>
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition ${loading || !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        onClick={handleCreatePost}
        disabled={loading || !isFormValid}
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>

      {response && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          <h3 className="font-bold">Post Created Successfully!</h3>
          <p><strong>Post ID:</strong> {response.id}</p>
          <p><strong>Title:</strong> {response.title}</p>
          <p><strong>Body:</strong> {response.body}</p>
        </div>
      )}

      {error && <div className="text-red-500 mt-4">{error}</div>}

      <button
        className="mt-4 text-blue-600 hover:underline"
        onClick={onGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default CreatePost;
