import NotFoundError from "../../Errors/notFoundError.js";
import eventData from "../../data/events.json" assert { type: "json" };

const deleteEvent = (id) => {
  const event = eventData.events.findIndex((event) => event.id === id);

  if (event === -1) {
    throw new NotFoundError("event", id);
  }

  eventData.events.splice(event, 1);
  return id;
};

export default deleteEvent;
