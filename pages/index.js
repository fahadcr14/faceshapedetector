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
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-6 px-10 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="text-2xl font-semibold">Face Shape Detector</div>
        <div className="space-x-6">
          <a href="#features" className="text-gray-400 hover:text-white">Features</a>
          <a href="#reviews" className="text-gray-400 hover:text-white">Reviews</a>
          <a href="#detect" className="text-gray-400 hover:text-white">Detect</a>
          <a href="#faq" className="text-gray-400 hover:text-white">FAQ</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Detect Your Face Shape with AI
        </h1>
        <p className="mt-6 mb-6 text-xl text-gray-400">Upload an image and let AI reveal your unique face shape.</p>
        <a href="#detect" className="mt-24 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
          Detect Face Shape
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <h2 className="text-4xl font-semibold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Face Shape Detection', icon: '📸', desc: 'Upload your image and let AI detect your face shape with high accuracy.' },
            { title: 'Personalized Insights', icon: '💡', desc: 'Get tailored recommendations based on your face shape.' },
            { title: 'Secure', icon: '🔒', desc: 'Your privacy is our priority. Images are not stored.' },
          ].map(({ title, icon, desc }, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upload Section */}
      <section id="detect" className="py-20 px-8">
        <h2 className="text-4xl font-semibold text-center mb-8">Upload Your Image</h2>
        <h2 className="text-2xl font-semibold text-center ">Your face is safe we don't store it</h2>

        <div className="text-center">
          <input
            type="file"
            onChange={uploadImage}
            className="block mx-auto mt-4 p-2 bg-gray-800 text-gray-300 rounded-lg"
          />
          <button
            disabled={loading}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload and Detect'}
          </button>
          {loading && <p className="mt-4 text-blue-500">Processing your image...</p>}
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-20 px-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-[20%] rounded-b-[10%]">
          <h2 className="text-4xl font-semibold text-center mb-6">Detection Results</h2>
          <div className="max-w-3xl mx-auto p-8 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <p className="text-2xl font-bold text-center">
              Your face shape is: <span className="text-blue-400">{result.topShape}</span>
            </p>
            <p className="text-gray-400 text-center mt-2">{result.topPercentage.toFixed(2)}%</p>
            <div className="mt-6 ">
              {result.sortedResult.map(([shape, percentage]) => (
                <div key={shape} className="mb-4 ">
                  <p className="text-gray-400">{shape}: {percentage.toFixed(2)}%</p>
                  <div className="w-full bg-gray-600 h-2 rounded-lg overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-8">
        <h2 className="text-4xl font-semibold text-center mb-8">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: 'Annonymous User', review: 'Amazing tool! Helped me understand my face shape easily.', avatar: '🧑🏻' },
            { name: 'Annonymous User', review: 'Fast and accurate results. Highly recommend!', avatar: '👨🏽' },
            { name: 'Annonymous User', review: 'The insights are spot on. Great app for styling tips.', avatar: '👩🏼' },
          ].map(({ name, review, avatar }, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">{avatar}</div>
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <p className="text-gray-400">{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-8 bg-gradient-to-b from-gray-900 to-gray-800">
        <h2 className="text-4xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { question: 'Is my image secure?', answer: 'Yes, we prioritize your privacy. Your image is processed securely and not stored.' },
            { question: 'How accurate is the detection?', answer: 'Our AI is trained on a diverse dataset to ensure high accuracy.' },
            { question: 'Can I use this on mobile?', answer: 'Yes, our application is fully responsive and works on all devices.' },
          ].map(({ question, answer }, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">{question}</h3>
              <p className="text-gray-400">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <p className="text-gray-400">&copy; 2024 Face Shape Detect. All rights reserved.</p>
      </footer>
    </div>
  );
}
