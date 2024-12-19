import multer from 'multer';
import axios from 'axios';

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to allow multer to handle file uploads
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      // Check if the file was uploaded successfully
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      try {
        // Convert the buffer to a Blob (image)
        const buffer = req.file.buffer;
        const blob = new Blob([buffer], { type: 'image/jpeg' });  // Adjust the MIME type if necessary

        // Prepare the form data for sending to the external API
        const formData = new FormData();
        formData.append('file', blob, 'image.jpg'); // Name the file as 'image.jpg' or use the actual file name

        // Call the external API (Hugging Face)
        const response = await axios.post('https://fahd9999-faceshapedetector.hf.space/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Check if the external API call was successful
        if (response.status === 200) {
          return res.status(200).json(response.data); // Forward the result to the frontend
        } else {
          return res.status(response.status).json({ error: 'Failed to process the image' });
        }
      } catch (error) {
        console.error('Error calling external API:', error);
        return res.status(500).json({ error: 'Failed to call the external API' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
