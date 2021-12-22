import * as JadwalDAO from '../dao/Jadwal'

export const getJadwalByWalDos = async (req, res, next) => {
  try {
    // const hari = req.query.hari
    const id_perkuliahan = parseInt(req.params.id_perkuliahan)
    const resultJadwal = await JadwalDAO.getJadwalByWalDos(
      id_perkuliahan
    )
    if (resultJadwal instanceof Error) throw resultJadwal
    res.status(200).json({
      message: 'Sukses retrieve data jadwal by waldos',
      data: resultJadwal
    })
  } catch (error) {
    next(error)
  }
}

export const getJadwalPerkuliahanByDay = async (req, res, next) => {
  try {
    const kode_hari = req.query.hari ? parseInt(req.query.hari) : Date.getDay()
    const kode_kelas = parseInt(req.params.kode_kelas)

    const jadwalPerkuliahanResult = await JadwalDAO.getJadwalPerkuliahanByDay(kode_kelas, kode_hari)

    if (jadwalPerkuliahanResult instanceof Error) throw jadwalPerkuliahanResult
    res.status(200).json({
      message: 'Sukses mendapatkan jadwal perkuliahan',
      data: jadwalPerkuliahanResult
    })
  } catch (error) {
    next(error)
  }
}