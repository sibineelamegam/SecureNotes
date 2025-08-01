// controllers/users/getProfile.js


import User from '../../models/User.js';

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: ' User not found' });
    }

    res.status(200).json(user); // Return user profile
  } catch (error) {
    console.error('Error in getProfile:', error.message);
    res.status(500).json({ message: ' Server error while fetching profile' });
  }
};

export default getProfile;
