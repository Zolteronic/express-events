import NotFoundError from "../Errors/notFoundError.js";

const notFoundHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  next(err);
};

export default notFoundHandler;
