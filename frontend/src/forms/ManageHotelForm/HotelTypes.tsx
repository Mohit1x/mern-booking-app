import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotelForm";

const HotelTypes = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Types</h1>
      <div className="grid grid-cols-5 gap-4">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "bg-blue-500 text-white shadow-lg px-4 py-2 cursor-pointer text-sm font-semibold"
                : "bg-gray-300 shadow-lg px-4 py-2 hover:bg-blue-400 cursor-pointer rounded-full text-sm"
            }
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default HotelTypes;
