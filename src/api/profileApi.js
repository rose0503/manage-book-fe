import {axiosClient} from "./axiosClient";

const profileApi = {
    getuser: (params) => {
        return axiosClient({
          method: "get",
          url: `/users/myuser`,
          headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt")
          },
          params
        })  
      }
}
  export default profileApi