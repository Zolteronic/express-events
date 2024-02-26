import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import getEvents from "../services/events/getEvents.js";
import notFoundHandler from "../middleware/notFoundHandler.js";
import createEvent from "../services/events/createEvent.js";
import getEventById from "../services/events/getEventById.js";
import updateEventById from "../services/events/updateEventsById.js";
import deleteEvent from "../services/events/deleteEvent.js";

const router = Router();

router.get(
  "/",
  (req, res) => {
    const { id, title } = req.query;
    const events = getEvents(id, title);
    res.status(200).json(events);
  },
  notFoundHandler
);

router.post(
  "/",
  authMiddleware,
  (req, res) => {
    const {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;
    const events = createEvent(
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime
    );
    res.status(201).json(events);
  },
  notFoundHandler
);

router.get(
  "/:id",
  (req, res) => {
    const event = getEventById(req.params.id);
    res.status(200).json(event);
  },
  notFoundHandler
);

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;

    const events = updateEventById(
      id,
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime
    );

    res.status(201).json({ message: "Event updated successfully" });
  },
  notFoundHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const events = deleteEvent(id);
    res.status(200).json({ message: "Event deleted successfully" });
  },
  notFoundHandler
);

export default router;
