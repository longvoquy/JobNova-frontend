// import axios from "axios";

// class Api {
//   instance;
//   constructor() {
//     this.instance = axios.create({
//       baseURL: "http://localhost:8080",
//       timeout: 10000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     this.instance.interceptors.response.use(
//       (response) => {
//         if (
//           response.config.url === "login" ||
//           response.config.url === "social" 
//           // response.config.url === "enterprise/login" ||
//           // response.config.url === "enterprise/social"
//         ) {
//           localStorage.setItem("token", response.data.token);
//           // Check the role and store accordingly
//           if (response.data.role === "1") {
//             localStorage.setItem("roleUser", response.data.role);
//           } else if (response.data.role === "2") {
//             localStorage.setItem("roleEnterprise", response.data.role);
//           }
//           window.location.replace("/");
//         }
//         return response;
//       },
//       (error) => {
//         if (error.response.data.message === "expired_session") {
//           localStorage.removeItem("token");
//           window.location.replace("login");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }
// }
// const api = new Api().instance;
// export default api;

import axios from "axios";

class Api {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        const { token, role } = response.data;

        if (url === "login" || url === "social") {
          localStorage.setItem("token", token);

          if (role === "1") {
            localStorage.setItem("roleUser", role);
          } else if (role === "2") {
            localStorage.setItem("roleEnterprise", role);
          }

          window.location.replace("/");
        }
        return response;
      },
      (error) => {
        if (error.response && error.response.data.message === "expired_session") {
          localStorage.removeItem("token");
          window.location.replace("login");
        }
        return Promise.reject(error);
      }
    );
  }
  checkLocalStorage() {
    const token = localStorage.getItem("token");
    const roleUser = localStorage.getItem("roleUser");
    const roleEnterprise = localStorage.getItem("roleEnterprise");

    console.log("Token:", token);
    console.log("Role User:", roleUser);
    console.log("Role Enterprise:", roleEnterprise);
  }
}

const api = new Api().instance;
export default api;
