import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { toast } from "sonner";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    ["fetchMyHotelById", hotelId],
    () => apiClient.fetchMyHotelById(hotelId!),
    {
      enabled: !!hotelId,
    }
  );
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["fetchMyHotelById"] });
      toast.success("Hotel Updated!");
    },
    onError: () => {
      toast.error("failed to update");
    },
  });

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} isLoading={isLoading} onSave={handleSave} />
  );
};

export default EditHotel;
