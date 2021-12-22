<template>
  <v-row :style="{ color: currentTheme.onBackground }">
    <v-col cols="12">
      <p
        :class="
          isMobile ? `text-h5 font-weight-bold` : `text-h4 font-weight-bold`
        "
      >
        Daftar Nilai Mahasiswa
      </p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems" />
    </v-col>
    <!-- <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
         <p
        :class="isMobile ? `text-left font-weight-bold text-h6` : `text-left font-weight-bold text-h5`"
        :style="{color: currentTheme.onBackground}"
        >Kelas</p>
        <v-item-group>
        <v-card link class="mb-3" v-for="item in listKelas" :key="item.Kelas">
          <v-item v-slot="{ active, toggle }">
            <KelasItem :kelas="item.kode_kelas" @click.native="getMatkulbyKelas(item) + toggle()" :bgcolor="active ? '#FB8C00' : currentTheme.surface"/>
          </v-item>
        </v-card>
        </v-item-group>
    </v-col> -->

    <v-row>
      <v-col cols="3">
        <v-select
          v-model="MataKuliahFilterValue"
          :items="ListMataKuliah"
          filled
          label="Semua Mata Kuliah"
          @change="filterMataKuliah"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="KelasFilterValue"
          :items="ListKelas"
          filled
          label="Semua Kelas"
          @change="filterKelas"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="SemesterFilterValue"
          :items="ListSemester"
          filled
          label="Semua Semester"
          @change="filterSemester"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="TahunFilterValue"
          :items="ListTahun"
          filled
          label="Semua tahun"
          @change="filterTahun"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <p
          class="text-left font-weight-bold text-h5"
          :style="{ color: currentTheme.onBackground }"
        >
          Daftar Rekap Nilai
        </p>
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn
          class="ma-2 white--text"
          :loading="loading"
          :disabled="loading"
          color="blue"
          @click="downloadTemplate()"
        >
          Unduh Templat
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <template>
          <v-data-table
            dense
            :headers="headers"
            :items="itemsWithIndex"
            item-key="name"
            class="elevation-1"
            :search="filters"
          >
          </v-data-table>
        </template>
      </v-col>
    </v-row>

    <!-- <v-divider v-if="!isMobile" vertical class="mx-5"></v-divider>
    <v-col sm="8">
    <p
    :class="isMobile ? `text-left font-weight-bold text-h6` : `text-left font-weight-bold text-h5`"
    :style="{color: currentTheme.onBackground}"
    >Mata Kuliah</p>
    <v-row v-if="listMatkul">
        <v-col
          no-gutters v-for="(item, index) in listMatkul" :key="item.Matkul"
          sm="4"
        >
          <NilaiMataKuliah :mataKuliah="item.nama_mata_kuliah" :semester="item.semester" :idMatkul="item.id" :idPerkuliahan="id_perkuliahan[index]" :onMatkulClicked="routeNilaiMatkul"/>
        </v-col>
      </v-row>
    </v-col> -->

    <v-col cols="12">
      <p
        class="text-left font-weight-bold text-h5"
        :style="{ color: currentTheme.onBackground }"
      >
        Daftar Nilai {{ nama_mata_kuliah }}-{{ kelas }}
      </p>
      <v-col>
        <v-row>
          <v-btn
            class="white--text"
            color="green"
            elevation="2"
            @click="openFile()"
          >
            IMPOR
          </v-btn>
          <v-btn
            class="ml-3 white--text"
            color="red"
            elevation="2"
            @click="resetTable()"
          >
            HAPUS
          </v-btn>
          <v-btn class="ml-3 white--text" color="blue">
            UNDUH
          </v-btn>
        </v-row>
      </v-col>
    </v-col>

    <v-col>
      <v-row>
        <v-col>
          <p
            class="text-left font-weight-bold text-h5"
            :style="{ color: currentTheme.onBackground }"
          >
            ETS
          </p>
        </v-col>
        <v-col class="text-right">
          <v-btn class="white--text" color="orange">
            HAPUS KATEGORI
          </v-btn>
          <v-btn
            class="ml-3 white--text"
            color="orange"
            @click="tambahKategori('ETS')"
          >
            TAMBAH KATEGORI
          </v-btn>
          <v-btn
            class="ml-3 white--text"
            color="orange"
            @click="saveKategori()"
          >
            SIMPAN
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-simple-table>
        <thead>
          <tr>
            <th
              rowspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              NIM
            </th>
            <th
              rowspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Nama
            </th>
            <th
              colspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Teori
            </th>
            <th
              colspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Praktik
            </th>
            <th
              colspan="1"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Lain-Lain Tugas
            </th>
          </tr>
          <tr>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 1
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 2
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 1
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 2
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 1
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="item in nilai_mahasiswa"
            :key="item.NIM"
          >
            <td>{{ item.NIM }}</td>
            <td>{{ item.Nama }}</td>
            <td v-for="(value, index) in item.Nilai" :key="index">
              {{ item.Nilai[index] }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col>
          <p
            class="text-left font-weight-bold text-h5"
            :style="{ color: currentTheme.onBackground }"
          >
            EAS
          </p>
        </v-col>
        <v-col class="text-right">
          <v-btn class="white--text" color="orange">
            DELETE CATEGORY
          </v-btn>
          <v-btn class="ml-3 white--text" color="orange">
            ADD CATEGORY
          </v-btn>
          <v-btn class="ml-3 white--text" color="orange">
            SAVE
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-simple-table>
        <thead>
          <tr>
            <th
              rowspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              NIM
            </th>
            <th
              rowspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Nama
            </th>
            <th
              colspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Teori
            </th>
            <th
              colspan="2"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Praktik
            </th>
            <th
              colspan="1"
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Lain-Lain Tugas
            </th>
          </tr>
          <tr>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 1
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 2
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 1
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 2
            </th>
            <th
              class="text-center"
              :style="{
                background: currentTheme.onBackground,
                color: currentTheme.background,
                border: '1px solid' + currentTheme.background
              }"
            >
              Tugas 1
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="item in nilai_mahasiswa"
            :key="item.NIM"
          >
            <td>{{ item.NIM }}</td>
            <td>{{ item.Nama }}</td>
            <td v-for="(value, index) in item.Nilai" :key="index">
              {{ item.Nilai[index] }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
</template>
<style scoped>
v-data-table >>> div > table {
  border-spacing: 0 6rem;
}
</style>

<style scoped>
v-data-table >>> div > table {
  border-spacing: 0 6rem;
}
</style>

<script>
import { mapGetters } from "vuex"
import Breadcumbs from "@/views/shared/navigation/Breadcumbs"
// import NilaiMataKuliah from "@/views/penilaian/component/dosen/NilaiMataKuliah"
// import KelasItem from "@/views/template/component/absensi/KelasItem"
import DosenAPI from "@/datasource/network/penilaian/PenilaianDosen"
// import { PENILAIAN_API_URL } from "../../../../config"

export default {
  name: "AbsensiDosenMain",
  components: { Breadcumbs },
  data () {
    return {
      breadcrumbItems: [
        {
          text: "Penilaian",
          disabled: false,
          href: "/penilaian"
        },
        {
          text: "Daftar Nilai Mahasiswa",
          disabled: false,
          href: "/penilaian/input-nilai"
        }
      ],
      nip: null,
      listKelas: [
        { id_kelas: 0, Kelas: "1A - D3 Teknik Informatika" },
        { id_kelas: 1, Kelas: "2A - D3 Teknik Informatika" },
        { id_kelas: 2, Kelas: "1A - D4 Teknik Informatika" }
      ],
      listMatkul: [
        // { id_matkul: 0, Matkul: "Proyek 3" },
        // { id_matkul: 1, Matkul: "APPL 2" },
        // { id_matkul: 2, Matkul: "Pengantar Angkungtangsi" }
      ],
      id_perkuliahan: null,
      ListMataKuliah: ["Pengembangan Web", "Struktur Data dan Algoritma"],
      ListKelas: ["3A", "3B"],
      ListSemester: ["1", "2"],
      ListTahun: [
        JSON.stringify(["2021", "2022"]),
        JSON.stringify(["2022", "2023"])
      ],
      desserts: [
        {
          KodeMataKuliah: "16TIN5054",
          MataKuliah: "Pengembangan Web",
          Kelas: "3A",
          Semester: "1",
          Tahun: JSON.stringify(["2021", "2022"])
        },
        {
          KodeMataKuliah: "16TIN5055",
          MataKuliah: "Pengembangan Web",
          Kelas: "3B",
          Semester: "1",
          Tahun: JSON.stringify(["2021", "2022"])
        },
        {
          KodeMataKuliah: "16TIN5056",
          MataKuliah: "Pengembangan Web",
          Kelas: "3A",
          Semester: "2",
          Tahun: JSON.stringify(["2022", "2023"])
        },
        {
          KodeMataKuliah: "16TIN5057",
          MataKuliah: "Pengembangan Web",
          Kelas: "3B",
          Semester: "2",
          Tahun: JSON.stringify(["2022", "2023"])
        },
        {
          KodeMataKuliah: "16TIN5058",
          MataKuliah: "Struktur Data dan Algoritma",
          Kelas: "3A",
          Semester: "1",
          Tahun: JSON.stringify(["2021", "2022"])
        },
        {
          KodeMataKuliah: "16TIN5059",
          MataKuliah: "Struktur Data dan Algoritma",
          Kelas: "3B",
          Semester: "1",
          Tahun: JSON.stringify(["2021", "2022"])
        },
        {
          KodeMataKuliah: "16TIN5060",
          MataKuliah: "Dasar-Dasar Pemrograman",
          Kelas: "3A",
          Semester: "1",
          Tahun: JSON.stringify(["2021", "2022"])
        },
        {
          KodeMataKuliah: "16TIN5061",
          MataKuliah: "Dasar-Dasar Pemrograman",
          Kelas: "3B",
          Semester: "1",
          Tahun: JSON.stringify(["2021", "2022"])
        }
      ],
      headers: [
        {
          text: "No",
          value: "index",
          class: "primary white--text title pr-4",
          align: "center"
        },
        {
          text: "Kode Mata Kuliah",
          value: "KodeMataKuliah",
          class: "primary white--text title",
          align: "center"
        },
        {
          text: "Mata Kuliah",
          value: "MataKuliah",
          class: "primary white--text title",
          align: "center",
          filter: this.filterMatakuliah
        },
        {
          text: "Kelas",
          value: "Kelas",
          class: "primary white--text title",
          align: "center",
          filter: this.filterKelas
        },
        {
          text: "Semester",
          value: "Semester",
          class: "primary white--text title",
          align: "center",
          filter: this.filterSemester
        },
        {
          text: "Tahun",
          value: "Tahun",
          class: "primary white--text title",
          align: "center",
          filter: this.filterTahun
        }
      ],
      filters: {
        added_by: ""
      },
      MataKuliahFilterValue: "",
      KelasFilterValue: "",
      SemesterFilterValue: "",
      TahunFilterValue: "",
      nama_mata_kuliah: "Pengembangan Web",
      kelas: "3B",
      rekap_nilai: [
        {
          KodeMataKuliah: "16TIN5054",
          MataKuliah: "Pengembangan Web",
          Kelas: "3A",
          Semester: "1",
          Tahun: ["2021", "2022"]
        },
        {
          KodeMataKuliah: "16TIN5055",
          MataKuliah: "Pengembangan Web",
          Kelas: "3B",
          Semester: "1",
          Tahun: ["2021", "2022"]
        },
        {
          KodeMataKuliah: "16TIN5056",
          MataKuliah: "Pengembangan Web",
          Kelas: "3A",
          Semester: "2",
          Tahun: ["2022", "2023"]
        },
        {
          KodeMataKuliah: "16TIN5057",
          MataKuliah: "Pengembangan Web",
          Kelas: "3B",
          Semester: "2",
          Tahun: ["2022", "2023"]
        },
        {
          KodeMataKuliah: "16TIN5058",
          MataKuliah: "Struktur Data dan Algoritma",
          Kelas: "3A",
          Semester: "1",
          Tahun: ["2021", "2022"]
        },
        {
          KodeMataKuliah: "16TIN5059",
          MataKuliah: "Struktur Data dan Algoritma",
          Kelas: "3B",
          Semester: "1",
          Tahun: ["2021", "2022"]
        },
        {
          KodeMataKuliah: "16TIN5060",
          MataKuliah: "Dasar-Dasar Pemrograman",
          Kelas: "3A",
          Semester: "1",
          Tahun: ["2021", "2022"]
        },
        {
          KodeMataKuliah: "16TIN5061",
          MataKuliah: "Dasar-Dasar Pemrograman",
          Kelas: "3B",
          Semester: "1",
          Tahun: ["2021", "2022"]
        }
      ],
      header_table: [
        {
          label: "NIM",
          rowspan: 2,
          key: "NIM",
          readOnly: true
        },
        {
          label: "Nama",
          rowspan: 2,
          key: "Nama",
          readOnly: true
        },
        {
          label: "Teori",
          colspan: 2,
          key: "parent1",
          bobot: 0
        },
        {
          label: "Praktik",
          colspan: 2,
          key: "parent2",
          bobot: 0
        },
        {
          label: "Lain-Lain Tugas",
          colspan: 1,
          key: "parent3",
          bobot: 0
        },
        {
          label: "Tugas 1",
          colspan: 1,
          key: "Nilai1",
          bobot: 0
        },
        {
          label: "Tugas 2",
          colspan: 1,
          key: "Nilai2",
          bobot: 0
        },
        {
          label: "Tugas 1",
          colspan: 1,
          key: "Nilai3",
          bobot: 0
        },
        {
          label: "Tugas 2",
          colspan: 1,
          key: "Nilai4",
          bobot: 0
        },
        {
          label: "Tugas 1",
          colspan: 1,
          key: "Nilai5",
          bobot: 0
        }
      ],
      nilai_mahasiswa: [
        {
          NIM: "181524002",
          Nama: "Alvira Putrina Darajat",
          Nilai: [0, 100, 100, 100, 100]
        },
        {
          NIM: 181524003,
          Nama: "Ananda Bayu",
          Nilai: [61, 45, 78, 48, 100]
        },
        {
          NIM: 181524004,
          Nama: "Chofief Al Farroqie",
          Nilai: [88, 100, 73, 45, 83]
        },
        {
          NIM: 181524005,
          Nama: "Dewanto Joyo",
          Nilai: [46, 48, 52, 64, 61]
        },
        {
          NIM: 181524006,
          Nama: "Dwinanda Alfauzan Suhando",
          Nilai: [90, 64, 79, 80, 61]
        },
        {
          NIM: 181524007,
          Nama: "Evan Lokajaya",
          Nilai: [62, 98, 92, 77, 59]
        },
        {
          NIM: 181524008,
          Nama: "Fajrina Aflaha",
          Nilai: [41, 91, 72, 53, 100]
        },
        {
          NIM: 181524009,
          Nama: "Fatharani",
          Nilai: [94, 89, 84, 57, 44]
        },
        {
          NIM: 181524010,
          Nama: "Hafiz Muhammad Fadli",
          Nilai: [63, 40, 53, 97, 45]
        },
        {
          NIM: 181524012,
          Nama: "Hanifah Sholihat",
          Nilai: [47, 41, 74, 96, 80]
        },
        {
          NIM: 181524013,
          Nama: "Icha Cahya Wulan",
          Nilai: [44, 80, 45, 42, 66]
        },
        {
          NIM: 181524014,
          Nama: "Khoirunnnisa Putri Kania",
          Nilai: [100, 94, 45, 44, 78]
        },
        {
          NIM: 181524015,
          Nama: "M. Andhika Zaini Z.",
          Nilai: [55, 83, 70, 62, 67]
        },
        {
          NIM: 181524016,
          Nama: "Mohammad Naufal Fadhil",
          Nilai: [46, 54, 77, 85, 94]
        },
        {
          NIM: 181524017,
          Nama: "Mufqi Uwais Nastiar Salim",
          Nilai: [45, 57, 45, 68, 41]
        },
        {
          NIM: 181524020,
          Nama: "Muhammad Fadhil",
          Nilai: [56, 40, 69, 93, 77]
        },
        {
          NIM: 181524021,
          Nama: "Muhammad Hanif Albaihaqi",
          Nilai: [62, 72, 66, 85, 90]
        },
        {
          NIM: 181524022,
          Nama: "Nadhilah Nurfajrina",
          Nilai: [94, 98, 69, 91, 72]
        },
        {
          NIM: 181524023,
          Nama: "Nadia Melyani",
          Nilai: [90, 95, 47, 93, 100]
        },
        {
          NIM: 181524025,
          Nama: "Naufal Rajabi",
          Nilai: [84, 98, 96, 77, 99]
        },
        {
          NIM: 181524026,
          Nama: "Raefaldhi Amartya Junior",
          Nilai: [98, 94, 51, 78, 78]
        },
        {
          NIM: 181524027,
          Nama: "Raihan Ibrahim Risyad",
          Nilai: [91, 61, 40, 74, 80]
        },
        {
          NIM: 181524028,
          Nama: "Rayhan Azka Anandhias P.",
          Nilai: [50, 88, 91, 91, 58]
        },
        {
          NIM: 181524029,
          Nama: "Riyanzani Anggara P",
          Nilai: [44, 61, 52, 86, 84]
        },
        {
          NIM: 181524030,
          Nama: "Roma Ulina Pasaribu",
          Nilai: [80, 73, 80, 73, 61]
        },
        {
          NIM: 181524031,
          Nama: "Zara Veda Mahendra",
          Nilai: [74, 96, 58, 82, 100]
        },
        {
          NIM: 181524032,
          Nama: "Zefan Gracio",
          Nilai: [86, 53, 97, 75, 47]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile () {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
    identity: function () {
      return this.$store.getters.identity
    },
    itemsWithIndex () {
      return this.desserts.map((desserts, index) => ({
        ...desserts,
        index: index + 1
      }))
    }
  },
  methods: {
    async getMatkulbyKelas (kodeKelas, index) {
      // console.log(kodeKelas)
      const matkul = await DosenAPI.getMatkul(this.nip, kodeKelas.kode_kelas)
      this.id_perkuliahan = matkul.id_perkuliahan
      this.listMatkul = matkul.listMatkul
    },
    routeNilaiMatkul (id, matkul) {
      // this.$router.push({ path: "input-nilai-matkul/" + id, params: { namaMatkul: matkul } })
      this.$router.push({
        name: "Input Nilai Matkul",
        path: "input-nilai-matkul/" + id,
        params: {
          id: id,
          namaMatkul: matkul
        }
      })
    },
    filterMatakuliah (val) {
      // If this filter has no value we just skip the entire filter.
      if (!this.MataKuliahFilterValue) {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return val === this.MataKuliahFilterValue
    },
    filterKelas (val) {
      // If this filter has no value we just skip the entire filter.
      if (!this.KelasFilterValue) {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return val === this.KelasFilterValue
    },
    filterSemester (val) {
      // If this filter has no value we just skip the entire filter.
      if (!this.SemesterFilterValue) {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return val === this.SemesterFilterValue
    },
    filterTahun (val) {
      // If this filter has no value we just skip the entire filter.
      if (!this.TahunFilterValue) {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return val === this.TahunFilterValue
    },
    tambahKategori (type) {
      this.dialogKategori = true
      if (type === "ETS") {
        // this.headerParentNilaiETS.push({ bobot: 0, colspan: 1, key: "didnot", label: "Test kategori" })
        this.parentKategori = this.headerParentNilaiETS
        this.newKategori.type = "ETS"
        // console.log("haloo")
        // console.log(this.headerParentNilaiETS)
      } else {
        this.parentKategori = this.headerParentNilaiEAS
        this.newKategori.type = "EAS"
        // console.log("halo eas")
      }
    },
    saveKategori () {
      var mahasiswa
      if (this.newKategori.parent === "") {
        if (this.newKategori.type === "ETS") {
          this.headerParentNilaiETS.push({
            label: this.newKategori.nama_kategori,
            colspan: 1,
            key: "ETS-newKategori",
            bobot: 0
          })
          this.headerChildNilaiETS.push({
            label: "Tugas 1",
            colspan: 1,
            key: "ETS-" + this.newKategori.nama_kategori + "-Tugas 1",
            bobot: 0
          })
          for (
            mahasiswa = 0;
            mahasiswa < this.dataNilaiMahasiswaETS.length;
            mahasiswa++
          ) {
            this.dataNilaiMahasiswaETS[mahasiswa].Nilai.push(0)
          }
        } else {
          this.headerParentNilaiEAS.push({
            label: this.newKategori.nama_kategori,
            colspan: 1,
            key: "EAS-newKategori",
            bobot: 0
          })
          this.headerChildNilaiEAS.push({
            label: "Tugas 1",
            colspan: 1,
            key: "ETS-" + this.newKategori.nama_kategori + "-Tugas 1",
            bobot: 0
          })
          for (
            mahasiswa = 0;
            mahasiswa < this.dataNilaiMahasiswaEAS.length;
            mahasiswa++
          ) {
            this.dataNilaiMahasiswaEAS[mahasiswa].Nilai.push(0)
          }
        }
      } else {
        var totalColspan = 0
        var i, index
        if (this.newKategori.type === "ETS") {
          // console.log(this.headerParentNilaiETS[this.headerParentNilaiETS.findIndex(obj => obj.key === this.newKategori.parent)])
          // console.log(this.headerParentNilaiETS)
          index = this.headerParentNilaiETS.findIndex(
            obj => obj.key === this.newKategori.parent
          )
          for (i = 0; i <= index; i++) {
            totalColspan += this.headerParentNilaiETS[i].colspan
          }
          this.headerChildNilaiETS.splice(totalColspan, 0, {
            label: this.newKategori.nama_kategori,
            colspan: 1,
            key: "ETS-newKategori-newChild" + this.newKategori.nama_kategori,
            bobot: 0
          })
          this.headerParentNilaiETS[
            this.headerParentNilaiETS.findIndex(
              obj => obj.key === this.newKategori.parent
            )
          ].colspan += 1

          for (
            mahasiswa = 0;
            mahasiswa < this.dataNilaiMahasiswaETS.length;
            mahasiswa++
          ) {
            this.dataNilaiMahasiswaETS[mahasiswa].Nilai.splice(
              totalColspan - 2,
              0,
              0
            )
          }
          // console.log(totalColspan)
          // this.headerParentNilaiETS[this.headerParentNilaiETS.findIndex(obj => obj.key === this.newKategori.parent)].colspan += 1
          // tambah kolom child
          console.log(this.dataNilaiMahasiswaETS)
        } else {
          index = this.headerParentNilaiEAS.findIndex(
            obj => obj.key === this.newKategori.parent
          )
          for (i = 0; i <= index; i++) {
            totalColspan += this.headerParentNilaiEAS[i].colspan
          }
          this.headerChildNilaiEAS.splice(totalColspan, 0, {
            label: this.newKategori.nama_kategori,
            colspan: 1,
            key: "ETS-newKategori-newChild" + this.newKategori.nama_kategori,
            bobot: 0
          })
          this.headerParentNilaiEAS[
            this.headerParentNilaiEAS.findIndex(
              obj => obj.key === this.newKategori.parent
            )
          ].colspan += 1

          for (
            mahasiswa = 0;
            mahasiswa < this.dataNilaiMahasiswaEAS.length;
            mahasiswa++
          ) {
            this.dataNilaiMahasiswaEAS[mahasiswa].Nilai.splice(
              totalColspan - 2,
              0,
              0
            )
          }
          // console.log(this.headerParentNilaiEAS)
          // totalColspan = 0
          // for (i = 0; i < this.headerParentNilaiEAS.length - 1; i++) {
          //   totalColspan += this.headerParentNilaiEAS[i].colspan
          // }
          // console.log(totalColspan)
          // this.headerParentNilaiEAS[this.headerParentNilaiEAS.findIndex(obj => obj.key === this.newKategori.parent)].colspan += 1
        }
        console.log(this.newKategori.parent)
      }
      // console.log(this.newKategori)
      this.closeKategori()
    },
    closeKategori (type) {
      this.newKategori.parent = ""
      this.newKategori.nama_kategori = ""
      this.newKategori.type = ""
      this.parentKategori = null
      this.dialogKategori = false
    },
    downloadTemplate () {
      window.open(
        "https://drive.google.com/u/1/uc?id=1rr4m8CVjXLBj8CjogpB4LEt_wAMEp5_y&export=download"
      )
    }
  },
  async mounted () {
    const identity = this.$store.getters.identity
    this.nip = identity.preferred_username // "196610181995121000"
    const kelas = await DosenAPI.getKelas(this.nip)
    this.listKelas = kelas.uniqueClass
  }
}
</script>
