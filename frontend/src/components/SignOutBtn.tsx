import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { toast } from "sonner";

const SignOutBtn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.SignOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      toast.success("sign out succesfull");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
