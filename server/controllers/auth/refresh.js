import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.status(401).json({ message: 'No refresh token found' });
  }

  const refreshToken = cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || user.status !== 'active') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    res.status(200).json({
      message: 'Access token refreshed',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log('Refresh token failed:', err);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export default refresh;
