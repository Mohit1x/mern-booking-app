import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetaiSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg h-fit border border-slate-300 p-5">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel.name},${hotel.city},${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in:
          <div className="font-bold">{checkIn?.toDateString()}</div>
        </div>
        <div>
          Check-out:
          <div className="font-bold">{checkOut?.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">
          {numberOfNights} {numberOfNights < 2 ? "night" : "nights"}
        </div>
      </div>
      <div>
        Guests{" "}
        <div className="font-bold">
          {adultCount} {adultCount < 2 ? "Adult" : "Adults"} , {childCount}{" "}
          Children
        </div>
      </div>
    </div>
  );
};

export default BookingDetaiSummary;
