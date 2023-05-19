export const protectRoute = (req, res, next) => {
  if (!req.session.isLoggedInd) {
    return res.status(401).json({ type: "failure", message: "Unauthorized" });
  }
  next();
};
