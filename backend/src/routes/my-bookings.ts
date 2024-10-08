import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: {
        $elemMatch: { userId: req.userId },
      },
    });

    const result = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter((booking) => {
        return booking.userId == req.userId;
      });

      const hotelWithUserBooking: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBooking;
    });

    res.status(200).send(result);
  } catch (error) {
    console.log(error, "/my-booiking");
    res.status(500).json({ message: "unable to fetch bookings" });
  }
});

export default router;
