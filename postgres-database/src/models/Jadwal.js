import Sequelize from 'sequelize'

import db from '../db'

const Jadwal = db.define('Jadwal', {
  id_jadwal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  ja: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  jb: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  waktu_mulai: {
    type: Sequelize.TIME,
    allowNull: false
  },
  waktu_selesai: {
    type: Sequelize.TIME,
    allowNull: false
  },
  hari:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  jenis:{
    type: Sequelize.CHAR(255),
    allowNull: false
  },
  nip:{
    type: Sequelize.CHAR(255),
    allowNull: false
  },
  id_perkuliahan:{
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default Jadwal
