import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
try {
    const existingRestaurants = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurants) {
        return res.status(409).json({ error: "Restaurant already exists" });
    }
    const image = req.file as Express.Multer.File;
    const base64image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);
    restaurant.imageURL = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    return res.status(201).send(restaurant);

} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating restaurant" });
}
};

export default {
  createMyRestaurant,
};
