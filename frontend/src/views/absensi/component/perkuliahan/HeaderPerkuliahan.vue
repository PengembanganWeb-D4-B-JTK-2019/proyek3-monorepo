<template>
  <v-container>
    <v-row no-gutters class="header">
      <v-col>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col md="2" xs="3">
            <h3>Mata Kuliah</h3>
          </v-col>
          <v-col>
            <h3>: {{ item.mata_kuliah.nama_mata_kuliah }} {{ item.jenis }}</h3>
          </v-col>
        </v-row>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col md="2" xs="3">
            <h3>Kelas</h3>
          </v-col>
          <v-col>
            <h3>: {{ item.kelas.kode_kelas }}</h3>
          </v-col>
        </v-row>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col md="2" xs="3">
            <h3>Jumlah Mhs</h3>
          </v-col>
          <v-col>
            <h3>: {{ jumlahMahasiswa }}</h3>
          </v-col>
        </v-row>
        <v-row no-gutters :style="{ color: currentTheme.onBackground }">
          <v-col md="2" xs="3">
            <h3>Tanggal</h3>
          </v-col>
          <v-col>
            <h3>: {{ date }}</h3>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col
        justify="end"
        cols = "2">
        <v-card
        height="110px"
        elevation="2"
        :color= "currentTheme.onSurface"
        :style="{ color: currentTheme.colorOnPrimary }"
        align="center"
        justify="center">
        <v-form class="formmhs">
           <p>Jumlah Mahasiswa</p>
           <h1>{{jumlahMahasiswa}}</h1>
           <p>Mahasiswa</p>
        </v-form>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["item"],
  data() {
    return {
      jumlahMahasiswa: 27,
      d: new Date(),
      date: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    })
  },
  beforeMount() {
    var month = "" + this.d.getMonth();
    var day = "" + this.d.getDate();
    var year = this.d.getFullYear();
    this.date = day + " " + this.months[month] + " " + year;
  }
};
</script>

<style scoped>
.formmhs {
  padding: 8px;
}
.header {
  padding-bottom: 20px;
}
p {
  margin: 0px;
}

h3 {
  font-weight: 500;
}
</style>
