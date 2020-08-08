import {axiosClient} from "./axiosClient";
const bookApi = {
  allbook: (params) => {
    return axiosClient({
      method: "get",
      url: "/books",
      params 
    })
  }
}
  export default bookApi