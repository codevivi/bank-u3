export const wrongEndPoint = (req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
};
