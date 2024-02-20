const errorCatcher = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An error occurred" });
};

export default errorCatcher;
