import {axiosClient} from "./axiosClient";

const tranApi = {
  alltran: (params) => {
    return axiosClient({
      method: "get",
      url: "/trans",
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
    },
      params 
    })
  },
  gettran: (params) => {
    return axiosClient({
      method: "get",
      url: `/trans/getid`,
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
      params
    })
  }
}
  export default tranApi