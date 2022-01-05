<template>
  <v-container>
    <v-row :style="{ color: currentTheme.onBackground }">
      <v-col cols="12">
        <h1 class="font-weight-bold">Perkuliahan</h1>
        <breadcumbs class="pt-2" :breadcrumb-items="breadcrumbItems" />
      </v-col>
    </v-row>
    <v-row>
      <HeaderPerkuliahan :item="item"></HeaderPerkuliahan>
    </v-row>
    <v-divider> </v-divider>
    <br />
    <v-row
      no-gutters
      align="end"
      align-md="start"
      :style="{ color: currentTheme.onBackground }"
    >
      <v-col md="10" cols="11">
        <p class="font-weight-bold responsive">
          Daftar Kehadiran Mahasiswa
        </p>
      </v-col>
      <v-col md="1" offset-md="0" offset="6" class="pl-0">
        <UploadBAP :perkuliahan="item"></UploadBAP>
      </v-col>
    </v-row>
    <v-card>
      <v-col class="pb-0 mt-2">
        <h2>Rekap Presensi Mahasiswa</h2>
      </v-col>
      <TabelAbsensi :perkuliahan="item"> </TabelAbsensi>
    </v-card>
  </v-container>
</template>
<style scoped>
@media screen and (max-width: 600px) {
  .responsive {
    font-size: 1.4rem !important;
    line-height: 1.8rem !important;
    letter-spacing: 0.0073529412em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  h2 {
    font-size: 20px;
  }
}

@media screen and (max-width: 1200px) {
  .responsive {
    font-size: 2.15rem;
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
}
</style>

<script>
import Breadcumbs from "@/views/shared/navigation/Breadcumbs";
import { mapGetters } from "vuex";
import HeaderPerkuliahan from "@/views/absensi/component/perkuliahan/HeaderPerkuliahan";
import UploadBAP from "@/views/absensi/component/perkuliahan/UploadBAP";
import TabelAbsensi from "@/views/absensi/component/perkuliahan/TabelAbsensi";

export default {
  name: "PerkuliahanDosen",
  props: {
    item: {
      type: Array,
      default() {
        return {};
      }
    }
  },
  components: { Breadcumbs, HeaderPerkuliahan, UploadBAP, TabelAbsensi },
  data() {
    return {
      breadcrumbItems: [
        {
          text: "Home",
          disabled: false,
          href: "/home"
        },
        {
          text: "Dashboard",
          disabled: false,
          href: "absensi"
        },
        {
          text: "Perkuliahan",
          disabled: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor"
    })
  },
  methods: {
    getData() {
      console.log(this.item);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
