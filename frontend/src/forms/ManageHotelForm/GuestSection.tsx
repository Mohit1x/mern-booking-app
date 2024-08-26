import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Guests</h1>
      <div className="grid grid-cols-2 gap-5 p-6 bg-blue-600">
        <div>
          {" "}
          <label className="input-label">
            Adults
            <input
              className="input"
              type="number"
              min={1}
              {...register("adultCount", {
                required: "this field is required",
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </div>
        <div>
          {" "}
          <label className="input-label">
            Childrens
            <input
              className="input"
              type="number"
              min={0}
              {...register("childCount", {
                required: "this field is required",
              })}
            />
          </label>
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestSection;
