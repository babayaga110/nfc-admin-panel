import { httpCallFunction } from "./httpFirebase";
import requests from "./httpService";

const AdminServices = {
  createUser: async (adminData) => {
    return httpCallFunction("createEventUser", adminData);
  },
  createAdmin: async (adminData) => {
    return requests.post("/createAdmin", adminData);
  },
  deleteAdmin: async ({name, email, id,createdAt}) => {
    return requests.delete(`/deleteAdmin?user=${name}&email=${email}&id=${id}&createdAt=${JSON.stringify(createdAt)}`);
  },
  getAdmins: async () => {
    return requests.get("/getAdmins");
  },
};

export default AdminServices;