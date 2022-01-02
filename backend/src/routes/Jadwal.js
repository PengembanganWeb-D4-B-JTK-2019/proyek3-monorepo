import express from 'express'
import * as JadwalController from '../controller/Jadwal'


const router = express.Router()
export default router


router.get('/get-jadwal/:id_perkuliahan', JadwalController.getJadwalByWalDos)
router.get('/kelas/:kode_kelas', JadwalController.getJadwalPerkuliahanByDay)