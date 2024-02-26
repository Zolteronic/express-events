import eventData from "../../data/events.json" assert { type: "json" };

const getEvents = (id, title) => {
  const events = eventData.events;
  if (id) {
    return events.filter((event) => event.id === id);
  }

  if (title) {
    return events.filter((event) => event.title.includes(title));
  }
  return events;
};

export default getEvents;
