import baseHttp from "./http";
import { PRESENSI_DSN_URL } from "./const";

export const persentaseMengajar = async nip => {
  try {
    const persentase =
      PRESENSI_DSN_URL + `/persentase-mengajar-dosen?nip=${nip}`;
    const result = await baseHttp.get(persentase, {}, { timeout: 3000 });
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

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
export const presensiMengajar = async nip => {
  try {
    const presensi = PRESENSI_DSN_URL + `/presensi-dosen/${nip}`;
    const result = await baseHttp.get(presensi, {}, { timeout: 3000 });
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const dataDosen = async nip => {
  try {
    const dataDsn = `/api/dosen/get/${nip}`;
    const result = await baseHttp.get(dataDsn, {}, { timeout: 3000 });
    return result.data;
  } catch (err) {
    console.error(err);
  }
};
