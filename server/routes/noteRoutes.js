// server/routes/noteRoutes.js

import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRoles from "../middleware/verifyRoles.js";

import createNote from "../controllers/notes/createNote.js";
import getNotes from "../controllers/notes/getNotes.js";
import getNoteById from "../controllers/notes/getNoteById.js";
import updateNote from "../controllers/notes/updateNote.js";
import deleteNote from "../controllers/notes/deleteNote.js";
import getAllNotesForAdmin from "../controllers/notes/getAllNotesForAdmin.js"; 

const router = express.Router();

// All note routes require authentication
router.use(verifyJWT);

// Add this route before the generic "/:id" one to prevent route collision
router.get("/admin/all", verifyRoles("admin"), getAllNotesForAdmin); 

// Routes for both user and admin
router.get("/", verifyRoles("user", "admin"), getNotes);   
router.post("/", verifyRoles("user", "admin"), createNote); 
router.get("/:id", verifyRoles("user", "admin"), getNoteById);
router.put("/:id", verifyRoles("user", "admin"), updateNote); 
router.delete("/:id", verifyRoles("user", "admin"), deleteNote);

export default router;
