import axios from "axios";

export default {
  getPaginatedData: async (search: any, page: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/students?s=${search}&page=${page}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  postStudentData: async (name: any, email: any, dob: any) => {
    try {
      const response = await axios.post(`http://localhost:3000/students`, {
        name,
        email,
        dob,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  editStudentData: async (id: any, name: any, email: any, dob: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/students/${id}`, {
        name,
        email,
        dob,
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  removeStudentData: async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/students/${id}`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};
