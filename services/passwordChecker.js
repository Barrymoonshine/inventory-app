const passwordChecker = (password) => (req, res, next) => {
  if (req.headers.authorisation === password) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default passwordChecker;
