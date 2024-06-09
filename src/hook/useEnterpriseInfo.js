// import { useQuery } from "@tanstack/react-query";
// import api from "../api/http";

// const useEnterpriseInfo = () => {
//     const token = localStorage.getItem("token");
//     return useQuery({
//         queryKey: ["ENTERPRISE_PROFILE"],
//         queryFn: () =>
//             api.get("/enterprise/profile", {
//                 headers: {
//                     Authorization: token,
//                 },
//             }),
//     });
// };
// export default useEnterpriseInfo;


import { useQuery } from "@tanstack/react-query";
import api from "../api/http";

const useEnterpriseInfo = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ["ENTERPRISE_PROFILE"],
        queryFn: () =>
            api.get("/enterprise/profile", {
                headers: {
                    Authorization: token, // Truyền token trực tiếp
                },
            }),
        retry: 1,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
        onError: (error) => {
            console.error("Lỗi khi lấy thông tin doanh nghiệp:", error);
            if (error.response && error.response.status === 400) {
                window.location.replace("login");
            }
        },
    });
};

export default useEnterpriseInfo;

