import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] shadow-xl border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm text-gray-400 font-bold">
              {hotel.type}
            </span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 2).map((facility) => (
              <span className="p-2 shadow-2xl font-semibold bg-gray-500 text-white rounded-lg text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span>
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2}more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold text-gray-600 text-[15px]">
              ${hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="shadow-2xl bg-blue-500 transition duration-150 hover:bg-blue-600 text-white h-full py-1 px-2 max-w-fit text-lg font-semibold rounded-lg"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
