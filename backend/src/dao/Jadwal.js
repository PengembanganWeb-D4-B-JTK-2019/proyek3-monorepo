import Jadwal from '@proyek3/postgres-database/models/Jadwal'
import Perkuliahan from '@proyek3/postgres-database/models/Perkuliahan'

export const getJadwalByWalDos = async (id_perkuliahan) => {
  try {
    const jadwal = await Jadwal.findAll({
      where: {
        // hari: hari,
        id_perkuliahan: id_perkuliahan
      }
    })
    return jadwal
  } catch (error) {
    return Promise.reject(new Error('Gagal mendapatkan jadwal'))
  }
}

export const getJadwalPerkuliahanByDay = async (kode_kelas, kode_hari) => {
  try {
    const result = await Perkuliahan.findAll({
      where: {
        kode_kelas: kode_kelas
      },
      include: {
        model: Jadwal,
        where: {
          hari: parseInt(kode_hari)
        }
      }
    })

    return result
  } catch (error) {
    return Promise.reject(new Error('Gagal mendapatkan jadwal berdasarkan hari'))
  }
}