import express from "express";
const router = express.Router();

import {
  index,
  show,
  destroy,
} from "../controllers/movieController.js";
//Rotte

// Index - Read all
router.get("/", index);

// Show - Read one -
router.get("/:id", show);


// Destroy - Delete
router.delete("/:id", destroy);

//export router
export default router;
