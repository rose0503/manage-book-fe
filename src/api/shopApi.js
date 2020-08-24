import {axiosClient} from "./axiosClient";

const shopApi = {
  allshop: (params) => {
    return axiosClient({
      method: "get",
      url: "/shop",
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
    },
      params 
    })
  },
  createshop: (name) => {
    return axiosClient({
      method: "post",
      url: `/shop/createshop`,
      data: {
          name
      },
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("jwt")
      }
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
  export default shopApi