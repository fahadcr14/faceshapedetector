import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const uploadImage = async (event) => {
    const fileInput = event.target.files[0];
    if (!fileInput) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', fileInput);

    try {
      const response = await axios.post('/api/predict', formData);
      console.log("response ", response)
      const sortedResult = Object.entries(response.data).sort((a, b) => b[1] - a[1]);
      const [topShape, topPercentage] = sortedResult[0];
      setResult({ sortedResult, topShape, topPercentage });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Face Shape Detect</div>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-300">Detect</a>
          <a href="#" className="hover:text-gray-300">Blog</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero bg-blue-500 text-white text-center py-16">
        <h1 className="text-4xl font-semibold">Detect Your Face Shape with AI</h1>
        <p className="mt-4 text-xl">Upload an image and let AI detect your face shape.</p>
      </section>

      {/* Upload Section */}
      <section className="upload-section text-center py-16">
        <h2 className="text-3xl font-semibold">Upload Your Image</h2>
        <input
          type="file"
          id="file-upload"
          onChange={uploadImage}
          className="mt-4 p-2 border rounded"
        />
        <button
          id="upload-btn"
          disabled={loading}
          className="mt-4 bg-blue-600 text-white p-2 rounded"
        >
          {loading ? 'Uploading...' : 'Upload and Detect'}
        </button>
        {loading && <div className="mt-4">Loading...</div>}
      </section>

      {/* Result Section */}
      {result && (
        <section id="result-section" className="py-16">
          <h2 className="text-3xl font-semibold text-center">Detection Results</h2>
          <h3 className="text-2xl font-semibold text-center mt-4">
            Your face shape is: {result.topShape}
          </h3>
          <p className="text-xl text-center mt-2">
            {result.topPercentage.toFixed(2)}%
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            {result.sortedResult.map(([shape, percentage]) => (
              <div key={shape} className="mb-4">
                <span className="text-lg">{shape}: {percentage.toFixed(2)}%</span>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4">
        <p>&copy; 2024 Face Shape Detect. All rights reserved.</p>
      </footer>
    </div>
  );
}
