<template>
  <v-sheet
    class="mx-auto"
    max-width="1000"
    :style="{ background: currentTheme.background }"
  >
    <v-slide-group class="d-flex align-center" value="3">
      <v-slide-item
        v-for="(item, index) in jadwalDsn"
        :key="index"
        class="d-flex align-self-center"
      >
        <v-col>
          <v-card
            class="
              text-center
              justify-center
              rounded-md
              d-flex
              flex-column
              active
            "
            width="325"
            height="300"
            :style="{
              background: !item.active
                ? currentTheme.surface
                : currentTheme.surface,
              color: currentTheme.onSurface,
            }"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <h3 class="mt-4 text-center">Presensi Dosen Pengampu</h3>
            <v-card-text :style="{ color: currentTheme.onSurface }"
              >{{ item.mata_kuliah.nama_mata_kuliah }}
              {{ item.jenis }}</v-card-text
            >
            <v-spacer></v-spacer>
            <v-row justify="center">
              <v-col class="pb-0 ml-4 mr-4">
                <p>
                  {{ currentDay }}, {{ item.waktu_mulai.slice(0, 5) }} -
                  {{ item.waktu_selesai.slice(0, 5) }} WIB
                </p>
              </v-col>
              <v-progress-linear
                background-color="#bfbfbf"
                :color="item.hadir ? 'success' : 'error'"
                :value="item.hadir ? 100 : item.progress"
                height="5"
                class="ml-8 mr-8 justify-center"
              ></v-progress-linear>
            </v-row>
            <v-card-actions class="justify-center">
              <v-btn
                :id="
                  item.hadir
                    ? 'custom-disabled-safe'
                    : item.progress === 100
                    ? 'custom-disabled-danger'
                    : 'custom-disabled-warn'
                "
                :disabled="
                  item.progress === 0 || item.progress === 100 || item.hadir
                "
                style="color: white"
                elevation="2"
                rounded-md
                class="responsive mt-5 ml-5 mr-5"
                color="#2196f3"
                width="120"
                @click="presensi(index, item.id_studi, item.id_jadwal)"
              >
                {{
                  item.hadir
                    ? "Hadir"
                    : item.progress === 100
                    ? "Tidak Hadir"
                    : "Presensi"
                }}</v-btn
              >
            </v-card-actions>
            <v-card-actions class="justify-center">
              <v-btn
                :to="{ name: 'Perkuliahan', params: { item } }"
                elevation="2"
                rounded-md
                class="responsive mb-2 ml-8 mr-8 justify-center white--text"
                width="200"
                color="#2196F3"
              >
                Kehadiran Mahasiswa</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<style scoped>
@media screen and (max-width: 768px) {
  .responsive {
    font-size: 12px;
  }
}

@media screen and (min-width: 1200px) {
  .responsive {
    font-size: 14px;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import PresensiDosen from "@/datasource/network/absensi/PresensiDosen";
import DateTime from "@/utils/dateTime.js";

const INTERVAL = 500;
const moment = require("moment");
let currentJadwal = 0;

export default {
  name: "AbsenCard",
  props: {
    jadwalDsn: {
      type: Array,
      default() {
        return {};
      },
    },
    username: {
      type: String,
      default() {
        return {};
      },
    },
  },
  async created() {
    // this.testProgressBar()
    var current = new Date();
    this.currentHour = current.getHours();
    this.currentMinute = current.getMinutes();
    this.currentDate =
      current.getFullYear() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getDate();
    this.currentDay = DateTime.getDay(current.getDay());
    await this.presensiSchedule();
    this.intervalId = setInterval(() => {
      current = new Date();
      this.currentHour = current.getHours();
      this.currentMinute = current.getMinutes();
      this.currentTime =
        this.currentHour +
        ":" +
        this.currentMinute +
        ":" +
        current.getSeconds();
      this.presensiSchedule();
    }, INTERVAL);
  },
  data() {
    return {
      currentHour: "",
      currentMinute: "",
      currentTime: "",
      currentDate: "",
      currentDay: "",
      currentJadwal: null,
      currentKehadiran: null,
      interval: 0,
      intervalId,
      //  data test
      jamAwal1: "23:00:00",
      jamAkhir1: "23:20:00",
      jamAwal2: "23:30:00",
      jamAkhir2: "23:50:00",
    };
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
    }),
  },
  methods: {
    presensi(index, idStudi, idJadwal) {
      if (this.jadwalDsn[currentJadwal].id_jadwal_kedua !== 0) {
        this.presensiDosen(
          index,
          this.jadwalDsn[currentJadwal].id_studi,
          this.jadwalDsn[currentJadwal].id_jadwal
        );
        this.presensiDosen(
          index,
          this.jadwalDsn[currentJadwal].id_studi_kedua,
          this.jadwalDsn[currentJadwal].id_jadwal_kedua
        );
      } else {
        this.presensiDosen(index, idStudi, idJadwal);
      }
    },
    presensiDosen(index, idStudi, idJadwal) {
      PresensiDosen.presensiDosen(this.username, idStudi, idJadwal)
        .then((response) => {
          this.jadwalDsn[index].absen = true;
          this.jadwalDsn[currentJadwal].hadir = true;
          console.log(
            "Dosen telah absen untuk jadwal " +
              idStudi +
              "Pada tanggal " +
              this.currentDate
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    statusKehadiranDosen(idJadwal) {
      PresensiDosen.getStatusKehadiran(
        this.username,
        idJadwal,
        this.currentDate
      )
        .then((response) => {
          this.currentKehadiran = response.data;
          this.jadwalDsn[currentJadwal].hadir =
            this.currentKehadiran[0].isHadir;
          console.log(
            "Status kehadiran dosen pada jadwal " +
              idJadwal +
              " adalah " +
              this.jadwalDsn[currentJadwal].hadir
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toPerkuliahan(index, item) {
      this.$router.push({ name: "Perkuliahan", params: { item } });
    },
    async presensiSchedule() {
      //  Jika Jadwalnya masih ada
      if (currentJadwal < this.jadwalDsn.length) {
        // Pengubahan Format
        var format = "HH:mm:ss";
        var currentTime = moment(this.currentTime, format);
        var beforeTime = moment(
          this.jadwalDsn[currentJadwal].waktu_mulai,
          format
        );
        var afterTime = moment(
          this.jadwalDsn[currentJadwal].waktu_selesai,
          format
        );

        // Perhitungan durasi, dilakukan untuk nilai progressbar
        var d = moment.duration(afterTime.diff(beforeTime, "seconds"));
        this.jadwalDsn[currentJadwal].duration = d._milliseconds;

        // Lama Matkul sudah berjalan
        var jadwalDuration = moment.duration(
          currentTime.diff(beforeTime, "seconds")
        );
        this.jadwalDsn[currentJadwal].currentDuration =
          jadwalDuration._milliseconds;

        // Pengurangan waktu mulai (waktu mulai absen adalah 30 menit sebelum jam mulai mata kuliah)
        beforeTime.subtract(30, "minutes");

        // Pengecekan tombol, apakah mahasiswa sudah absen, tidak akan hadir, atau sudah absen
        this.cekAktivasiTombol(this.jadwalDsn[currentJadwal].id_jadwal);

        // Pengecekan, apakah saat ini berada pada interval waktu mata kuliah yang sedang berlangsung atau tidak
        if (currentTime.isBetween(beforeTime, afterTime)) {
          // Pengecekan, apakah mahasiswa ybs tidak izin dan belum absen, dilakukan untuk aktivasi tombol
          if (this.currentKehadiran[0].isHadir === false) {
          } else if (this.currentKehadiran[0].isHadir === true) {
            this.jadwalDsn[currentJadwal].absen = true;
            this.jadwalDsn[currentJadwal].hadir = true;
          }

          // Perhitungan untuk value dari progressbar dan menyatakan saat ini mata kuliah sedang berlangsung
          this.jadwalDsn[currentJadwal].progress =
            (this.jadwalDsn[currentJadwal].currentDuration /
              this.jadwalDsn[currentJadwal].duration) *
            100;
          this.jadwalDsn[currentJadwal].active = false;
          // this.jadwalDsn[currentJadwal].currentDuration = this.jadwalDsn[currentJadwal].currentDuration + 15
        } else {
          //  kondisi ketika saat ini bukan dalam interval waktu mata kuliah
          //  jika saat ini adalah setelah waktu mata kuliah yang telah berlangsung sebelumnya
          if (currentTime.isAfter(afterTime)) {
            if (
              this.currentKehadiran[0].isHadir === true ||
              this.currentKehadiran[0].id_keterangan === "sakit" ||
              this.currentKehadiran[0].id_keterangan === "izin"
            ) {
              this.jadwalDsn[currentJadwal].absen = true;
              this.jadwalDsn[currentJadwal].hadir = true;
            }
            this.jadwalDsn[currentJadwal].absen = true;
            this.jadwalDsn[currentJadwal].active = true;
            this.jadwalDsn[currentJadwal].progress = 100;
            // if (this.currentKehadiran[0].isHadir === true && this.currentKehadiran[0].id_keterangan === null) {
            //   console.log("Mahasiswa sudah absen di jadwal ke- " + this.jadwalDsn[currentJadwal].id_jadwal)
            // }
            if (currentJadwal !== this.jadwalDsn.length-1)
              currentJadwal++;
            else
              clearInterval(this.intervalId);
          } else {
            //  jika sekarang bukan waktu setelah mata kuliah (keknya inisalah dan perlu diperbaiki kondisinya)
            this.jadwalDsn[currentJadwal].active = true;
            this.jadwalDsn[currentJadwal].absen = true;
          }
        }
      } else {
        clearInterval(this.intervalId);
      }
    },
    cekAktivasiTombol(idJadwal) {
      this.statusKehadiranDosen(idJadwal);
    },
    testProgressBar() {
      this.jadwalDsn[0].waktu_mulai = this.jamAwal1;
      this.jadwalDsn[0].waktu_selesai = this.jamAkhir1;
      this.jadwalDsn[1].waktu_mulai = this.jamAwal2;
      this.jadwalDsn[1].waktu_selesai = this.jamAkhir2;
    },
    cekMatkulSama() {
      for (var i in this.jadwalDsn) {
        if (
          this.jadwalDsn[i].mata_kuliah.nama_mata_kuliah ===
          this.jadwalDsn[i + 1].mata_kuliah.nama_mata_kuliah
        ) {
          console.log(
            "Jadwal " +
              this.jadwalDsn[i] +
              " sama dengan jadwal " +
              this.jadwalDsn[i]
          );
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    currentJadwal = 0;
  },
};
</script>

<style scoped>
.active {
  background: #272343;
  color: white;
}

#custom-disabled-safe.v-btn--disabled {
  background-color: #4caf50 !important;
  color: white !important;
}

#custom-disabled-warn.v-btn--disabled {
  background-color: #fb8c00 !important;
  color: white !important;
}

#custom-disabled-danger.v-btn--disabled {
  background-color: #ff5252 !important;
  color: white !important;
}
/* .v-btn:hover {
  background: blue !important;
} */
</style>
