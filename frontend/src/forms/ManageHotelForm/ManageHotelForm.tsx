import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelTypes from "./HotelTypes";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethod = useForm<HotelFormData>();
  const { handleSubmit } = formMethod;

  const onsubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
  });
  return (
    <FormProvider {...formMethod}>
      <form className="flex flex-col gap-10" onSubmit={onsubmit}>
        <DetailsSection />
        <HotelTypes />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-bold disabled:bg-gray-500"
          >
            {isLoading ? "Saving....." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
