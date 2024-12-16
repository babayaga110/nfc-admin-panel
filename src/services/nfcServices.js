import requests from "./httpService";

const nfcServices = {
  writeNfcCard: (body) => {
    return requests.post("/nfcWrite", body);
  },
};

export default nfcServices;
