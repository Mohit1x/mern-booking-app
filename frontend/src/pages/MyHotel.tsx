import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { FaLocationDot } from "react-icons/fa6";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiParentFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";

const MyHotel = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );
  console.log(hotelData);

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="font-bold text-3xl">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="p-2 bg-blue-600 text-white flex text-xl hover:bg-blue-500 rounded-md"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col border border-slate-300 shadow-lg justify-between py-8 px-5 gap-5">
            <h2 className="font-bold text-xl">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <FaLocationDot className="mr-1" />
                {hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <TbBuildingSkyscraper className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsCurrencyDollar className="mr-1" />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <RiParentFill className="mr-1" />
                {hotel.adultCount} adult , {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <FaStar className="mr-1 text-yellow-400" />
                {hotel.starRating} star rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="p-2 bg-blue-600 text-white flex text-lg font-bold hover:bg-blue-500 rounded-md"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
