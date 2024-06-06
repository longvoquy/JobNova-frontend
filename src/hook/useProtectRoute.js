const useProtectRoute = ()=>{
    const token = localStorage.getItem("token");
    if (token != null) {
      window.location.replace("/")
    }
}
export default useProtectRoute;