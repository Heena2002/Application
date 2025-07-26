import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    setAnswer('⏳ Please wait...');
    try {
      if (query.toLowerCase().includes('top')) {
        const res = await fetch('http://localhost:4000/api/top-products');
        const data = await res.json();
        setAnswer(JSON.stringify(data, null, 2));
      } else if (query.toLowerCase().includes('order id')) {
        const id = query.match(/\d+/)[0];
        const res = await fetch(`http://localhost:4000/api/order-status/${id}`);
        const data = await res.json();
        setAnswer(JSON.stringify(data, null, 2));
      } else if (query.toLowerCase().includes('left')) {
        const name = query.split('how many ')[1].split(' are')[0];
        const res = await fetch(`http://localhost:4000/api/stock/${name}`);
        const data = await res.json();
        setAnswer(JSON.stringify(data, null, 2));
      } else {
        setAnswer('❓ I cannot understand this query.');
      }
    } catch (error) {
      setAnswer('🚫 Failed to fetch data. Please check if backend is running.');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h2 style={{ color: '#333' }}>🛍️ SmartChatBot</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ask me anything..."
        style={{
          width: '70%',
          padding: '12px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={handleAsk}
        style={{
          padding: '12px 20px',
          marginLeft: '10px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Ask
      </button>

      <pre
        style={{
          marginTop: '20px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          whiteSpace: 'pre-wrap'
        }}
      >
        {answer}
      </pre>
    </div>
  );
}

export default App;
