import express from "express";
import MyRestaurantController from "../controller/MyRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);


export default router;