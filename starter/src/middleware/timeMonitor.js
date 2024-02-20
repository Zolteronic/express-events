const timeMonitorMiddleware = (req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`Request took ${elapsedTime}ms`);
  });
  next();
};

export default timeMonitorMiddleware;
