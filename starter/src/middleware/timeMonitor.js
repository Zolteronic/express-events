const timeMonitorMiddleware = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    console.log(`${req.method} ${url} took ${elapsedTime}ms`);
  });
  next();
};

export default timeMonitorMiddleware;
