import * as MahasiswaDAO from '../dao/Mahasiswa'
import * as StudiDAO from '../dao/Studi'
import expressValidator from 'express-validator/check'
import Mahasiswa from '../models/Mahasiswa'
const { validationResult } = expressValidator

export const postNewMahasiswa = async (req, res, next) => {
  try {
    const {
      NIM,
      namaMahasiswa,
      kodeKelas,
      email,
      nomorHp,
      urlFoto
    } = req.body
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const mahasiswa = await MahasiswaDAO.insertOneMahasiswa(
      NIM,
      namaMahasiswa,
      parseInt(kodeKelas),
      email,
      nomorHp,
      urlFoto
    )

    if (typeof mahasiswa === 'undefined') {
      error.status = 500
      error.message = 'Insert Mahasiswa gagal'
      throw error
    }

    res.status(200).json({
      message: 'insert mahasiswa sukses',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}

export const updateNomorHpMahasiswa = async (req, res, next) => {
  try {
    const { NIM } = req.params
    const updateMahasiswa = await MahasiswaDAO.updateNomorHpMahasiswa(NIM, req.body.nomorHP)
    if (updateMahasiswa === 1) {
      const mahasiswa = await MahasiswaDAO.findMahasiswaByNIM(NIM)
      res.status(200).json({
        message: 'Update Nomor HP Mahasiswa berhasil',
        data: {
          mahasiswa
        }
      })
    } else {
      const error = new Error('Update Nomor HP gagal')
      error.statusCode = 500
      error.cause = 'Update Nomor HP gagal'
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const deleteMahasiswabyId = async (req, res, next) => {
  try {
    const mahasiswaId = req.params.NIM
    const result = await MahasiswaDAO.deleteMahasiswabyId(mahasiswaId)
    if (result === 1) {
      res.status(200).json({
        message: 'Delete mahasiswa berhasil',
        data: {
          mahasiswaId
        }
      })
    } else {
      const error = new Error('Delete mahasiswa gagal')
      error.statusCode = 500
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const getAllMahasiswa = async (req, res, next) => {
  try {
    const mahasiswa = await MahasiswaDAO.findAllMahasiswa()
    res.status(200).json({
      message: 'get all mahasiswa success',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getOneMahasiswaByNIM = async (req, res, next) => {
  try {
    const { NIM } = req.params
    const mahasiswa = await MahasiswaDAO.findOneMahasiswaByNIM(NIM)
    res.status(200).json({
      message: 'get one Mahasiswa by NIM success',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}

export const searchMahasiswaByName = async (req, res, next) => {
  try {
    const { nama } = req.params
    const mahasiswa = await MahasiswaDAO.findMahasiswaByName(nama)
    res.status(200).json({
      message: 'find Mahasiswa by name success',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}

export const searchMahasiswaByNIM = async (req, res, next) => {
  try {
    const { NIM } = req.params
    const mahasiswa = await MahasiswaDAO.findMahasiswaByNIM(NIM)
    res.status(200).json({
      message: 'find Mahasiswa by NIM success',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getMahasiswaByPerkuliahan = async (req, res, next) =>{
  try{
    const idPerkuliahan = req.params.id_perkuliahan

    const studi = await StudiDAO.findStudiByIdPerkuliahan(idPerkuliahan);
    var listIdMahasiswa = []
    var i
    var j
    for(i = 0; i<studi.length; i++){
      var idMahasiswa = studi[i].id_mahasiswa
      listIdMahasiswa.push(idMahasiswa)
    }
    const mahasiswaPerkuliahan = await MahasiswaDAO.findMahasiswaCriteriaNIM(listIdMahasiswa)
    res.status(200).json({
      message: 'get matkul by dosen sukses',
        data: {
          mahasiswaPerkuliahan
        }
    })
  } catch (error) {
    next(error)
  }
}