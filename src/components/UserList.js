import React, { useEffect, useState } from 'react';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Select a User</h2>
      <input
        type="text"
        placeholder="Search user by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-4 rounded-lg"
      />
      <ul className="space-y-2">
        {filteredUsers.map(user => (
          <li
            key={user.id}
            className="cursor-pointer p-2 border-b hover:bg-gray-100 transition"
            onClick={() => onSelectUser(user)}
          >
            {user.name}
          </li>
        ))}
        {filteredUsers.length === 0 && (
          <li className="text-center text-gray-500">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
