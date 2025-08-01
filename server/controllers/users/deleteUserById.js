import User from '../../models/User.js';

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUserById:', error.message);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};

export default deleteUserById;
