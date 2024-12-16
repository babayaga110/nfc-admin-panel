import requests from "./httpService";

const headers = {
  "Content-Type": "multipart/form-data",
};

const fileServices = {
  uploadFile: (body) => {
    return requests.post("/uploadFile", body, headers);
  },
  deleteFile: (url) => {
    return requests.delete(`/deleteFile?url=${url}&type=media`);
  },
};

export default fileServices;
