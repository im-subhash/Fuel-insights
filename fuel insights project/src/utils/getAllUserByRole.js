import { BASE_URL } from "../configs/config";
const getAllUserByRole = async (role) => {
    try {
      const response = await fetch(`${BASE_URL}user/get-users/${role}`, {
        headers : {
          'authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      console.log(`${role} data : `, data);
      return data.data;
    } catch (err) {
        console.log(`All ${role} fetching err`);
       return null;
    }
  };

  export default getAllUserByRole;