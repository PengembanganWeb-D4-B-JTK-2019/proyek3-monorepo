<template>
  <v-flex>
    <v-card class="d-flex pa-0" :height="455" :width="'100%'">
      <div class="flex-column w100">
        <div id="card-title">
          <h3 class="white--text mt-2 font-weight-medium">
            Rekap Presensi Dosen
          </h3>
        </div>
        <v-virtual-scroll :items="dataDsn" :item-height="120" height="390">
          <template v-slot:default="{ item }">
            <div class="flex-column mx-2 mt-2">
              <v-card-actions>
                <v-row no-gutters align="center">
                  <v-col cols="8">
                    <PersentaseMengajarModal
                      :matakuliah="item.nama_mata_kuliah"
                      :presensi="presensi"
                    />
                    <v-progress-linear
                      class="mr-3 pa-0"
                      id="rounded-bar"
                      :height="25"
                      :value="item.persen_mengajar_matkul"
                      color="#59DCDC"
                      background-color="#DADADA"
                    >
                    </v-progress-linear>
                  </v-col>
                  <v-col cols="4">
                    <v-card-text
                      class="
                        responsive
                        ml-3
                        mt-3
                        ma-0
                        pa-0
                        font-weight-black
                        text-center
                      "
                      id="dark-blue"
                      ><h1 class="font-weight-black">
                        {{ item.persen_mengajar_matkul }}%
                      </h1></v-card-text
                    >
                    <v-card-text
                      class="
                        responsive
                        ml-3
                        ma-0
                        pa-0
                        text-center
                        font-weight-bold
                      "
                      id="dark-blue"
                      >Total Jam Mengajar</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </div>
          </template>
        </v-virtual-scroll>
      </div>
    </v-card>
  </v-flex>
</template>
<style scoped>
@media screen and (max-width: 768px) {
  .responsive {
    font-size: 12px;
  }
  h3 {
    font-size: 14px;
  }
}

@media screen and (min-width: 1200px) {
  .responsive {
    font-size: 16px;
  }
  h3 {
    font-size: 18px;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import PersentaseMengajarModal from "./PersentaseMengajarModal.vue";
import {
  presensiMengajar,
  dataDosen
} from "../../../../datasource/network/absensi/dashboardDosen.js";

export default {
  name: "PersentaseMengajar",
  components: {
    PersentaseMengajarModal
  },
  data() {
    return {
      dataDsnTemp: [],
      dataDsn: [],
      presensi: []
    };
  },
  async created() {
    await this.hitungPersentasePerMatkul();
    this.$nextTick(() => {
      this.dataDsn = this.dataDsnTemp;
    });
  },
  methods: {
    async getDataDosen() {
      const result = await dataDosen(this.identity.preferred_username);
      this.dataDsnTemp = result.data.dosen;
    },
    async getPresensiMatkul() {
      const result = await presensiMengajar(this.identity.preferred_username);
      this.presensi = result.data.presensi;
    },
    async hitungPersentasePerMatkul() {
      await this.getDataDosen();
      await this.getPresensiMatkul();
      for (let i = 0; i < this.dataDsnTemp.length; i++) {
        let jumlahMengajar = 0;
        let counterMatkul = 0;
        for (let j = 0; j < this.presensi.length; j++) {
          if (this.dataDsnTemp[i].id === this.presensi[j].id) {
            counterMatkul++;
            if (this.presensi[j].isHadir === true) {
              jumlahMengajar++;
            }
          }
        }
        this.dataDsnTemp[i].persen_mengajar_matkul = Math.round(
          (jumlahMengajar / counterMatkul) * 100
        );
      }
    }
  },

  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    }),
    identity: function() {
      return this.$store.getters.identity;
    }
  }
};
</script>
