import { useQuery } from "@tanstack/react-query";
import api from "../api/http";

const useEnterpriseInfo = () => {
    const token = localStorage.getItem("token");
    return useQuery({
        queryKey: ["ENTERPRISE_PROFILE"],
        queryFn: () =>
            api.get("/enterprise/profile", {
                headers: {
                    Authorization: token,
                },
            }),
    });
};
export default useEnterpriseInfo;
