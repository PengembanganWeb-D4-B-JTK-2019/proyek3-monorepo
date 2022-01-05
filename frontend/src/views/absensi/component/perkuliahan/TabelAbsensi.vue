<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr :style="{ background: currentTheme.colorPrimary }">
            <th class="text-left">
              <div :style="tableTitleStyle" class="text-subtitle-2">No</div>
            </th>
            <th class="text-left">
              <div :style="tableTitleStyle" class="text-subtitle-2">NIM</div>
            </th>
            <th class="text-left">
              <div :style="tableTitleStyle" class="text-subtitle-2">Nama</div>
            </th>
            <th class="text-left">
              <div :style="tableTitleStyle" class="text-subtitle-2">Status</div>
            </th>
            <th class="text-left">
              <div :style="tableTitleStyle" class="text-subtitle-2">
                Keterlambatan
              </div>
            </th>
            <th class="text-left" v-if="!editFlag">
              <div :style="tableTitleStyle" class="text-subtitle-2">
                Keterangan
              </div>
            </th>
            <th class="text-left" v-if="editFlag">
              <div :style="tableTitleStyle" class="text-subtitle-2">Edit</div>
            </th>
          </tr>
        </thead>
        <tbody :style="{ background: currentTheme.surface }">
          <tr v-for="(item, index) in mahasiswa" :key="item.id_studi">
            <td
              class="text-capitalize text-caption font-weight-medium test"
              v-if="!isMobile"
              :style="{ color: currentTheme.onSurface }"
            >
              {{ index + 1 }}
            </td>
            <td
              class="text-capitalize text-caption font-weight-medium"
              v-if="!isMobile"
              :style="{ color: currentTheme.onSurface }"
            >
              {{ item.nim }}
            </td>
            <td
              class="text-capitalize text-caption font-weight-medium"
              :style="{ color: currentTheme.onSurface }"
            >
              {{ item.nama }}
            </td>
            <td
              class="text-capitalize text-caption font-weight-medium"
              :style="{ color: currentTheme.onSurface }"
            >
              {{ item.status }}
            </td>
            <td
              class="text-capitalize text-caption font-weight-medium"
              :style="{ color: currentTheme.onSurface }"
            >
              {{ item.keterlambatan }} menit
            </td>
            <td v-if="editFlag">
              <v-radio-group
                column
                v-model="item.isHadir"
                :disabled="
                  item.status ===
                    'Izin yang diajukan sedang diperiksa waldos' ||
                    item.status === 'sakit' ||
                    item.status === 'izin' ||
                    item.status === 'Tidak Hadir'
                "
                @change="updateMahasiswa(item)"
              >
                <v-row class="d-flex flex-column">
                  <v-col cols="6">
                    <v-radio
                      label="Hadir"
                      :value="true"
                      :color="currentTheme.onSurface"
                    >
                    </v-radio>
                  </v-col>
                  <v-col cols="6">
                    <v-radio
                      label="Tidak Hadir"
                      :value="false"
                      :color="currentTheme.onSurface"
                    >
                    </v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </td>
            <td
              class="text-capitalize text-caption font-weight-medium"
              :style="{ color: currentTheme.onSurface }"
              v-if="!editFlag"
            >
              {{ item.isHadir ? "Hadir" : "Tidak Hadir" }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <h1 class="text-center ma-8" v-if="mahasiswa.length === 0">
      Kuliah Belum Dimulai
    </h1>
    <v-row justify="end">
      <v-btn
        :disabled="mahasiswa.length === 0"
        class="ma-6 pl-6 pr-6"
        :color="editFlag ? '#00C853' : '#FB8C00'"
        dark
        @click="toogleEdit()"
        >{{ editFlag ? "Submit" : "Edit" }}</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
// import DialogValidasi from "@/views/template/component/perkuliahan/DialogValidasi"
import kehadiran from "../../../../datasource/network/absensi/perkuliahan";

export default {
  name: "NilaiTable",
  props: {
    perkuliahan: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      dialog: [false],
      currentDate: new Date().toISOString().substr(0, 10),
      data: [],
      mahasiswa: [],
      radios: true,
      editFlag: false
    };
  },
  methods: {
    getKehadiran() {
      kehadiran
        .getKehadiranMhs(
          this.perkuliahan.kelas.kode_kelas,
          this.perkuliahan.id_jadwal,
          this.currentDate
        )
        .then(response => {
          this.data = response.data;
          this.mahasiswa = this.data.mahasiswa;
        })
        .catch(e => {
          console.log(this.perkuliahan);
          console.log(e);
        });
    },
    updateMahasiswa(mhs) {
      kehadiran
        .updateKehadiranMhs(
          mhs.id_studi,
          this.perkuliahan.id_jadwal,
          this.currentDate,
          mhs.isHadir
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    toogleEdit() {
      this.editFlag = !this.editFlag;
    }
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    isMobile() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
    },
    tableTitleStyle() {
      return {
        color: this.currentTheme.colorOnPrimary
      };
    }
  },
  mounted() {
    this.getKehadiran();
  }
};
</script>

<style scoped></style>
