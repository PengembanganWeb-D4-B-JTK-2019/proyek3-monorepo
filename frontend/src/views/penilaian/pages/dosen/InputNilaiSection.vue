<template>
  <v-row :style="{color: currentTheme.onBackground}">
  <v-col>
    <v-col cols="12">
      <p class="text-h4 font-weight-bold deep-purple--text">Daftar Nilai Mahasiswa</p>
    </v-col>
    <v-col cols="12">
      <breadcumbs :breadcrumb-items="breadcrumbItems"/>
    </v-col>
    <v-col :cols="isMobile ? `12` : `3` " :offset="isMobile ? `0` : `0`">
        <!-- <p
        class="text-left font-weight-bold text-h5"
        :style="{color: currentTheme.onBackground}"
        >Kelas</p>
        <v-item-group>
        <v-card link class="mb-3" v-for="item in listKelas" :key="item.Kelas">
          <v-item v-slot="{ active, toggle }">
            <KelasItem :kelas="item.kode_kelas" @click.native="getMatkulbyKelas(item) + toggle()" :bgcolor="active ? '#FB8C00' : currentTheme.surface"/>
          </v-item>
        </v-card>
        </v-item-group> -->
    </v-col>

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
    </v-row>

    <v-row>
      <v-col>
       <h1 style="font-size:30px" class="font-weight-black">
          List Rekap Nilai
      </h1>
       </v-col>
         <v-col cols="14" class="text-right">
          <v-btn
            class="ma-2 white--text"
            :loading="loading"
            :disabled="loading"
            color="blue"
            @click="loader = 'loading'"
          >
            Download
          </v-btn>
          <v-btn
            class="ma-2 white--text"
            :loading="loading"
            :disabled="loading"
            color="blue"
            to="/penilaian/transkripsi-nilai/${Mahasiswa.id}"
          >
            test
          </v-btn>
          </v-col>
    </v-row>

    <v-row>
      <v-col>
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
    class="text-left font-weight-bold text-h5"
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
  </v-col>
  </v-row>
</template>
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
          text: "Input Nilai Mahasiswa",
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
      ListMataKuliah: [
        "Semua Mata Kuliah",
        "Pengembangan Web",
        "Struktur Data dan Algoritma"
      ],
      ListKelas: [
        "Semua Kelas",
        "3A",
        "3B"
      ],
      ListSemester: [
        "Semua Semester",
        "1",
        "2"
      ],
      ListTahun: [
        "Semua Tahun",
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
        { text: "No", value: "index", class: "deep-purple darken-4 white--text title pr-4", align: "center" },
        { text: "Kode Mata Kuliah", value: "KodeMataKuliah", class: "deep-purple darken-4 white--text title", align: "center" },
        { text: "Mata Kuliah", value: "MataKuliah", class: "deep-purple darken-4 white--text title", align: "center", filter: this.filterMatakuliah },
        { text: "Kelas", value: "Kelas", class: "deep-purple darken-4 white--text title", align: "center", filter: this.filterKelas },
        { text: "Semester", value: "Semester", class: "deep-purple darken-4 white--text title", align: "center", filter: this.filterSemester },
        { text: "Tahun", value: "Tahun", class: "deep-purple darken-4 white--text title", align: "center", filter: this.filterTahun }
      ],
      filters: {
        added_by: ""
      },
      MataKuliahFilterValue: "",
      KelasFilterValue: "",
      SemesterFilterValue: "",
      TahunFilterValue: ""
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
      return this.desserts.map(
        (desserts, index) => ({
          ...desserts,
          index: index + 1
        })
      )
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
      if (this.MataKuliahFilterValue === "Semua Mata Kuliah") {
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
      if (this.KelasFilterValue === "Semua Kelas") {
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
      if (this.SemesterFilterValue === "Semua Semester") {
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
      if (this.TahunFilterValue === "Semua Tahun") {
        return true
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return val === this.TahunFilterValue
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
