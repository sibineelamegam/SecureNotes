import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRoles from "../middleware/verifyRoles.js";

import getProfile from "../controllers/users/getProfile.js";
import updateUser from "../controllers/users/updateUser.js"; 
import getAllUsers from "../controllers/users/getAllUsers.js";
import deleteUserById from "../controllers/users/deleteUserById.js";

const router = express.Router();

// All routes below require authentication
router.use(verifyJWT);

// Profile Routes (restricted to user + admin)
router.get("/profile", verifyRoles("user", "admin"), getProfile);
router.patch("/profile", verifyRoles("user", "admin"), updateUser); 

// Admin-only user management
router.get("/admin/users", verifyRoles("admin"), getAllUsers);
router.patch("/admin/users/:id", verifyRoles("admin"), updateUser); 
router.delete("/admin/users/:id", verifyRoles("admin"), deleteUserById);

export default router;
