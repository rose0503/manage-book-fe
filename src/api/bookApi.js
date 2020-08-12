import {axiosClient} from "./axiosClient";

const bookApi = {
  allbook: (params) => {
    return axiosClient({
      method: "get",
      url: "/books",
      params 
    })
  },
  getbook: (params) => {
    return axiosClient({
      method: "get",
      url: `/books/${params}`,
      params
    })
  }
}
  export default bookApi