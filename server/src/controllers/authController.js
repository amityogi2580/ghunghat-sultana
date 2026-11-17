import Admin from '../models/Admin.js';

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check for email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }

    // 2. Check for admin (we must explicitly ask for the password this time)
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Create token and send response
    const token = admin.getSignedJwtToken();
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};