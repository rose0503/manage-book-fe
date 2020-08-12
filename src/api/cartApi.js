import {axiosClient} from "./axiosClient";

const cartApi = {
  addcart: (data) => {
    return axiosClient({
      method: "post",
      url: "/cart/addcart",
      headers: {
          'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
      data 
    })
  },
  
}
  export default cartApi