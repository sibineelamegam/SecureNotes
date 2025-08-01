// controllers/users/updateUser.js

import User from '../../models/User.js';

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // This can be user ID or current user ID
    const userIdToUpdate = id || req.userId;

    const {
      username,
      email,
      firstName,
      lastName,
      age,
      gender,
      dob,
      phone,
      address,
      role,    // Only admins should be allowed to send this
      status,  // Only admins should be allowed to send this
    } = req.body;

    const user = await User.findById(userIdToUpdate);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check unique username if changed
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      user.username = username;
    }

    // Check unique email if changed
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    // Always allowed fields
    Object.assign(user, {
      firstName,
      lastName,
      age,
      gender,
      dob,
      phone,
    });

    // Admin-only fields
    if (req.roles?.includes('admin')) {
      if (role) user.role = role;
      if (status) user.status = status;
    }

    // Address update
    if (address) {
      user.address = {
        ...user.address, // Keep existing fields
        ...address, // Overwrite with what was sent (partial update)
      };
    }

    const updatedUser = await user.save();
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      message: 'User updated successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error in updateUser:', error.message);
    res.status(500).json({ message: 'Server error while updating user' });
  }
};

export default updateUser;
