import baseHttp from "./http"
import { BAP_URL } from "./const"

const postBAP = async (data) => {
  const BAPEndpoint = BAP_URL + "/new";
  try {
    const result = await baseHttp.post(BAPEndpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return result.data
  } catch (err) {
    console.error(err)
  }
}

const getBAP = async (idJadwal, tanggal) => {
  const BAPEndpoint = BAP_URL + `/find-bap?idJadwal=${idJadwal}&tanggal=${tanggal}`;
  try {
    const result = await baseHttp.get(BAPEndpoint);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

const getBAPbyNIP = async (NIP) => {
  const BAPEndpoint = BAP_URL + `/get-by-nip/${NIP}`;
  try {
    const result = await baseHttp.get(BAPEndpoint);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

const updateBAP = async (idBAP, data) => {
  const BAPEndpoint = BAP_URL + `/update/${idBAP}`;
  try {
    const result = await baseHttp.put(BAPEndpoint, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export default {
  postBAP,
  getBAP,
  getBAPbyNIP,
  updateBAP,
}