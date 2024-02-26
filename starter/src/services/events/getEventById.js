import eventData from "../../data/events.json" assert { type: "json" };
import NotFoundError from "../../Errors/notFoundError.js";

const getEventById = (id) => {
  const events = eventData.events;
  const event = events.find((event) => event.id === id);
  if (!event) {
    throw new NotFoundError("event", id);
  }
  return event;
};
export default getEventById;
