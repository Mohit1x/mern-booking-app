import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-2">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition duration-300 hover:scale-[1.03] group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 font-normal w-full cursor-pointer"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
              if (totalLength === 0) {
                return "Atleast one image shoulde be added";
              }
              if (totalLength > 6) {
                return "Total Number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  );
};

export default ImageSection;
