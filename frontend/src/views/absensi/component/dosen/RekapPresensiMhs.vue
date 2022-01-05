<template>
    <v-data-table
        :headers="headers"
        :items="mahasiswa"
        hide-default-header
        disable-sort
        class="font-weight-bolder"
    >

    <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th v-for="h in headers" class="v-data-header font-weight-bold text-body-2 text-center" :key="h">
              <span>{{h.text}}</span>
            </th>
          </tr>
        </thead>
    </template>
    <template v-slot:item="{ mahasiswa }">
        <tr
        v-for="(item) in mahasiswa"
        :key="item.id_mata_kuliah"
        >
            <td>{{ item.id_studi }}</td>
            <td>{{ item.nim }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.isHadir }}</td>
        </tr>
    </template>
    </v-data-table>
</template>

<script>
import { mapGetters } from "vuex"
// import PresensiMhs from "@/datasource/network/absensi/PresensiMahasiswa";
import { PresensiMhs } from "@/datasource/network/absensi/dashboardDosen";

export default {
    name: "PresensiCardMhs",
    created() {
        
    },
    data () {
        return {
            headers:[
                { text: "No", value: "id_studi", align: "center" },
                { text: "NIM", value: "nim", align: "center" },
                { text: "Nama", value: "name", align: "center" },
                { text: "Presentase Kehadiran", value: "isHadir", align: "center" },
            ],
            mahasiswa:[],
            dataMhsTemp: [],
            rekPresensi: [],
        }
    },
    computed: {
        ...mapGetters({
            currentTheme: "theme/getCurrentColor",
            isDark: "theme/getIsDark"
        }),
        identity: function() {
            return this.$store.getters.identity;
        }
    },
    methods: {
        // getKehadiran() {
            // PresensiMhs.rekapPresensiMhs("16TIN5033")
            //     .then(response => {
            //         const result = response.data
            //         this.mahasiswa = result.data.mahasiswa
            //     })
            //     .catch(e => {
            //         console.log(this.dashboardDosen);
            //         console.log(e)
            //     })
            
            async getKehadiran() {
                // const result = await rekapPresensiMhs(this.id_mata_kuliah)
                const result = await rekapPresensiMhs("16TIN5033")
                this.dataMhsTemp = result.data.mahasiswa
                console.log(this.dataMhsTemp)
            }
    },
  mounted () {
    this.getKehadiran()
  }
}
</script>

<style>
    .active {
        background: #272343;
        color: white;
    }
    .v-data-header{
        background: #272343 !important;
        color: white !important;
    }
    .v-data-footer{
        background: #272343 !important;
        color: white !important;
        font-weight: bold;
    }
    .v-select__selections{
        background: none;
        color: white !important;
    }
    .mdi-menu-down{
        color: white !important;
    }
    .mdi-chevron-right{
        background: none;
        color: white !important;
    }
    .mdi-chevron-left{
        background: none;
        color: white !important;
    }
    /* .mdi dan .v-icon class -> icon luar table keganti juga warnanya*/
</style>