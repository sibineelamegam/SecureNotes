const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

export default logout;
