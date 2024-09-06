import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Details = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  if (!hotel) return <></>;

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-500" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[200px]">
            <img
              src={image}
              alt={hotel.name}
              className="h-full w-full rounded-md object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 p-2 bg-blue-600 rounded-lg text-white font-semibold">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line border border-slate-300 p-2 font-semibold bg-blue-600 text-white">
          <h1 className="capitalize text-teal-300 font-bold text-2xl">
            {hotel.name}
          </h1>
          {hotel.description}
        </div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
