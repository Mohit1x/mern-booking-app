import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-option-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="font-bold text-2xl mb-2">Facilities</h1>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label className="text-sm text-gray-700 flex gap-1">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities.length > 0) {
                    return true;
                  } else {
                    return "Atleast one Facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
