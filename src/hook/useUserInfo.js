import { useQuery } from "@tanstack/react-query";
import api from "../api/http";

const useUserInfo = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["USER_PROFILE"],
    queryFn: () =>
      api.get("/candidate-profile", {
        headers: {
          Authorization: token,
        },
      }),
  });
};
export default useUserInfo;
