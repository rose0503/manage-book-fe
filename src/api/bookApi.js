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
  },
  createbook: (title, description, coverUrl) => {
    return axiosClient({
      method: "post",
      url: "/books/create",
      headers: {
          'Authorization': "Bearer " + localStorage.getItem("jwt")
      },
      data : {
        title,
        description,
        coverUrl
      }
    })
  },
}
  export default bookApi