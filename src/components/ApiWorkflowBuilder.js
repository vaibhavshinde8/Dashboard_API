import React, { useState } from 'react';

const ApiWorkflowBuilder = ({ onChainComplete }) => {
  const [selectedApi, setSelectedApi] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleApiSelect = async (api) => {
    setSelectedApi(api);
    try {
      const response = await fetch(api.url);
      const data = await response.json();
      setResponseData(data);
      onChainComplete(data);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Select an API to Chain</h2>
      <button onClick={() => handleApiSelect({ url: 'https://jsonplaceholder.typicode.com/users' })} className="bg-blue-500 text-white px-4 py-2 mt-2">Fetch Users</button>
      <div>
        {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default ApiWorkflowBuilder;
