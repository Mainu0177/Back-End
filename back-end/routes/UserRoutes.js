import express from 'express';
import { getAllUser, login, signup } from './../controllers/UserController';

const router = express.Router();

router.get("/", getAllUser);
router.post("signup", signup);
router.post("login", login)

export default router;