<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        color="#000000"
        class="ma-0 ml-0 mb-2 pa-0 font-weight-black"
        v-on="on"
        v-bind="attrs"
      >
        {{ matakuliah }}
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-actions class="justify-end">
          <v-btn icon @click="dialog.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <div class="pa-4 pt-0">
          <v-card-title class="pt-0 pl-0 black--text font-weight-black"> Rekap Presensi Dosen </v-card-title>
          <v-data-table
            disable-filtering
            disable-pagination
            disable-sort
            hide-default-header
            item
            :mobile-breakpoint="0"
            :headers="headers"
            :items="dataRekap"
            :hide-default-footer="true"
            class="font-weight-medium"
          >
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th v-for="h in headers" class="custom-header font-weight-bold text-body-2" :key="h">
                  <span>{{h.text}}</span>
                </th>
              </tr>
            </thead>
          </template>
          </v-data-table>
          <div class="mt-6 font-weight-bold">
            <p>Total Minggu Perkuliahan: {{ dataRekap.length }} Minggu</p>
            <p>Total Minggu Perkuliahan Tersisa: {{ 16 - dataRekap.length }} Minggu</p>
          </div>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "PersentaseMengajarModal",
  props: {
    matakuliah: {
      type: String,
    },
    presensi: {
      type: Array,
    },
  },
  data() {
    return {
      dataRekap: [],
      headers: [
        {
          text: "Pertemuan Ke-",
          align: "center",
          sortable: false,
          value: "index",
        },
        {
          text: "Tanggal",
          align: "center",
          sortable: false,
          value: "tanggal",
        },
        {
          text: "Status Pengisisan Bap",
          align: "center",
          sortable: false,
          value: "bap",
        },
        {
          text: "Status Kehadiran",
          align: "center",
          sortable: false,
          value: "isHadir",
        },
      ],
      items: [
        {
          pertemuan: "1",
          tanggal: Date.now(),
          bap: true,
          kehadiran: true
        },
        {
          pertemuan: "2",
          tanggal: Date.now(),
          bap: true,
          kehadiran: true
        },
        {
          pertemuan: "3",
          tanggal: Date.now(),
          bap: true,
          kehadiran: true
        },
        {
          pertemuan: "4",
          tanggal: Date.now(),
          bap: true,
          kehadiran: true
        },
        {
          pertemuan: "5",
          tanggal: Date.now(),
          bap: true,
          kehadiran: true
        },
        {
          pertemuan: "6",
          tanggal: Date.now(),
          bap: true,
          kehadiran: true
        },
      ]
    };
  },
  created() {
    this.dataRekap = this.presensi.filter((e) => {
      return e.nama_mata_kuliah === this.matakuliah;
    });
    for (let i = 0; i < this.dataRekap.length; i++) {
      this.dataRekap[i].index = i + 1;
    }
    console.log(this.dataRekap);
  }
};
</script>

<style>
.custom-header {
  background: #272343;
  color: #FFFFFF !important;
  text-align: center !important;
}
</style>