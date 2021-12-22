import mataKuliah from '@proyek3/postgres-database/models/Mata_Kuliah'
import programStudi from '@proyek3/postgres-database/models/Program_Studi'
import mahasiswa from '@proyek3/postgres-database/models/Mahasiswa'
import kelas from '@proyek3/postgres-database/models/Kelas'
import perkuliahan from '@proyek3/postgres-database/models/Perkuliahan'
import dosen from '@proyek3/postgres-database/models/Dosen'
import jabatan from '@proyek3/postgres-database/models/Jabatan'
import jurusan from '@proyek3/postgres-database/models/Jurusan'
import jadwal from '@proyek3/postgres-database/models/Jadwal'
import studi from '@proyek3/postgres-database/models/Studi'

export const setAssociations = () => {
  programStudi.hasMany(mataKuliah, {
    foreignKey: 'kode_program_studi'
  })
  mahasiswa.belongsToMany(perkuliahan, {
    through: 'Studi'
  })
  kelas.hasMany(mahasiswa, {
    foreignKey: 'kode_kelas'
  })
  kelas.hasMany(perkuliahan, {
    foreignKey: 'kode_kelas'
  })
  mataKuliah.hasMany(perkuliahan, {
    foreignKey: 'id'
  })
  perkuliahan.hasMany(studi, {
    foreignKey: 'id'
  })
  mahasiswa.hasMany(studi, {
    foreignKey: 'id'
  })
  dosen.belongsToMany(perkuliahan, {
    through: 'Pengajar'
  })
  perkuliahan.belongsToMany(dosen, {
    through: 'Pengajar'
  })
  dosen.hasOne(kelas, {
    foreignKey: 'nip'
  })
  dosen.hasMany(programStudi, {
    foreignKey: 'nip'
  })
  dosen.hasMany(jurusan, {
    foreignKey: 'nip'
  })
  jabatan.hasOne(dosen, {
    foreignKey: 'id_jabatan'
  })
  programStudi.hasMany(mataKuliah, {
    foreignKey: 'kode_program_studi'
  })
  programStudi.hasMany(kelas, {
    foreignKey: 'kode_program_studi'
  })
  jurusan.hasMany(programStudi, {
    foreignKey: 'kode_jurusan'
  })
  perkuliahan.hasMany(jadwal, {
    foreignKey: 'id_perkuliahan'
  })
  dosen.belongsToMany(jabatan, {
    through: 'Menjabat',
    as: 'jabatan',
    foreignKey: 'nip'
  })
  jabatan.belongsToMany(dosen, {
    through: 'Menjabat',
    as: 'dosen',
    foreignKey: 'id_jabatan'
  })
  
}