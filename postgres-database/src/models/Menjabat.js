import Sequelize from 'sequelize'
import db from '../db'

const Menjabat = db.define('Menjabat', {
  nip: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'Dosen',
      key: 'nip'
    }
  },
  id_jabatan: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Jabatan',
      key: 'id'
    }
  }
})
Menjabat.removeAttribute('id')

export default Menjabat
