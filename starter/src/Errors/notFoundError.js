class NotFoundError extends Error {
  constructor(resourceType, id) {
    super(`Could not find ${resourceType} with id: ${id}`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
