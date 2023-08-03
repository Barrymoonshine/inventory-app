const passwordChecker = (password) => (req, res, next) => {
  console.log(
    'passwordChecker req.headers.authorisation',
    req.headers.authorisation
  );
  if (req.headers.authorisation === password) {
    next();
  } else {
    console.log('failed password check');
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default passwordChecker;
