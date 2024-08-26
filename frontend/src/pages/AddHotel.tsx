import { toast } from "sonner";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";

const AddHotel = () => {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel Saved!");
    },
    onError: () => {
      toast.error("Error Saving hotel");
    },
  });

  const handleSave = (hotelFormDataL: FormData) => {
    mutate(hotelFormDataL);
  };
  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
