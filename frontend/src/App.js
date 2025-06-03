import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(null);
    setResult('');
    setError('');

    if (!file) {
      setError('Please select an image file.');
      return;
    }

    // Optional: check file type
    if (!file.type.startsWith('image/')) {
      setError('File is not an image.');
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');
    setError('');

    if (!image) {
      setError('No image selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setError('Leaf is in good condition');
    }
  };

  return (
    <div className="container">
      <h2>🌿 Plant Disease Identifier</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />
        <button type="submit">Predict</button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && <h3>Result: {result}</h3>}
    </div>
  );
}

export default App;