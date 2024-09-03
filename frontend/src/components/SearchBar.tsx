import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date | undefined>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-white shadow-2xl grid grid-cols-2 lg:grid-cols-3 2xl-5 items-center gap-4 rounded-lg"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 border-r border-gray-400">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 border-r border-gray-400">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="flex">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-in date"
          className="min-w-full bg-white ml-2 placeholder:text-lg p-2 focus:outline-none rounded-lg"
          wrapperClassName="min-w-full"
          showIcon
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check-out date"
          className="min-w-full bg-white p-2 ml-2 placeholder:text-lg focus:outline-none border-r border-gray-400"
          wrapperClassName="min-w-full"
          showIcon
        />
      </div>
      <div className="flex gap-1 ml-2">
        <button className="w-2/3 bg-blue-600 transition duration-150 hover:bg-blue-500 text-white h-full p-2 font-bold text-xl rounded-lg">
          Search
        </button>
        <button className="w-1/3 bg-red-600 hover:bg-red-500 transition duration-150 text-white h-full p-2 font-bold text-xl rounded-lg">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
