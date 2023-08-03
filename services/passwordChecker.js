const passwordChecker = (password) => {
  if (password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default passwordChecker;
