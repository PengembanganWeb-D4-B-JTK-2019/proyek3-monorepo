import baseHttp from "./http"
import { PRESENSI_DSN_URL } from "./const"

const persentaseMengajar = async (nip) => {
  try {
    const persentase = PRESENSI_DSN_URL + `/persentase-mengajar-dosen?nip=${nip}`
    const result = await baseHttp.get(persentase, {}, { timeout: 10000 })
    return result.data
  } catch (err) {
    console.error(err)
  }
}

export const rekapPresensiMhs = async id_mata_kuliah => {
  try {
    const dataMhs = `api/mahasiswa/dosen-mhs-matkul/get/${id_mata_kuliah}`;
    const result = await baseHttp.get(dataMhs, {}, { timeout: 3000 });
    return result.data;
  } catch (err) {
    console.erroe(err);
  }
}

export default {
  persentaseMengajar
}
