import User from '../../models/User.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password

    res.status(200).json({
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error.message);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

export default getAllUsers;
