import cloudinary from '../config/cloudinary.js';

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin only)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Convert the file buffer to a base64 string
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'ghunghat-sultana', // Organizes images in a folder
      resource_type: 'auto',
    });

    res.status(200).json({
      success: true,
      url: result.secure_url, // The image URL we will save to MongoDB
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};