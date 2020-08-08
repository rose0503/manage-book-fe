import {axiosClient} from "./axiosClient";

const authApi = {
  registerUser: (email, name, password) => {
    return axiosClient({
      method: "post",
      url: "/auth/signup",
      data: {
        email,
        name, 
        password
      }   
    })
  },
  signinUser: (email, password) =>{
    return axiosClient("/auth/signin",{
      method: "post",
      data: {
        email, 
        password
      }
    })
  }

}
  export default authApi