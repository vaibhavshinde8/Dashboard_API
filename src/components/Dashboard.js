import React, { useState } from 'react';
import UserList from './UserList';
import CreatePost from './CreatePost';
import CommentsList from './CommentsList';

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [createdPost, setCreatedPost] = useState(null);

  const handleGoBack = () => {
    setCreatedPost(null); 
    setSelectedUser(null); 
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">API Chaining Dashboard</h1>

      {!selectedUser ? (
        <UserList onSelectUser={setSelectedUser} />
      ) : !createdPost ? (
        <CreatePost user={selectedUser} setCreatedPost={setCreatedPost} onGoBack={handleGoBack} />
      ) : (
        <div>
          <CommentsList postId={createdPost.id} />
          <button
            className="mt-4 text-blue-600 hover:underline"
            onClick={() => setCreatedPost(null)}
          >
            Go Back to Create Another Post
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
