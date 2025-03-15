exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role === role) {
        return next();
      } else {
        return res.status(403).json({ message: 'Access denied. Incorrect role.' });
      }      
    } else {
      return res.status(401).json({ message: 'Not authenticated' });
    }    
  };
};

exports.isAuthenticated = (req, res, next) => {
  //console.log(' authenticating...');
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};
