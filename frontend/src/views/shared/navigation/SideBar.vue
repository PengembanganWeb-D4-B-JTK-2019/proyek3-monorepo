<template>
  <v-navigation-drawer clipped app permanent id="sidebar"  @transitionend="collapseSubItems">
    <v-list>
      <v-list-item-content dense class="pl-3">
        <v-row justify="start" align="center">
          <v-col cols="2">
            <v-avatar>
              <img
                :src="user.image"
                alt="John"
              >
            </v-avatar>
          </v-col>
          <v-col style="color:white" offset="1" justify="center">
            <p class="ma-0">{{ user.nama }}</p>
            <p class="ma-0 mt-2">{{ user.nomorInduk }}</p>
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-list-item-content class="pl-3 pr-3 pb-0">
        <v-divider style="border-color: #FFFFFF; opacity: 0.5;"></v-divider>
      </v-list-item-content>
      <v-list-item-content dense class="pl-3">
        <v-switch
          v-model="darkmode"
          :label="`Dark mode`"
          dark
        ></v-switch>
      </v-list-item-content>
      <div
        v-for="(item, i) in navItem"
        :key="i"
      >

        <v-list-item
          v-if="!item.to && !item.subLinks"
          :key="i"
          dark
          class="pb-0 mb-n2"
          :class="i === 0 ? 'mt-3' : 'mt-6'"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text" class="font-weight-bold text-h6"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="!item.subLinks && item.to"
          :key="i"
          link
          :to="item.to"
          active-class="itemOnActive"
          dark
        >
          <v-list-item-icon v-if="item.icon">
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text" style="color:white"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-if="item.subLinks"
          :key="item.text"
          link
          dark
          eager
          v-model="isActive"
        >
          <template v-slot:activator>
            <v-list-item
              :key="i"
              dark
              color="primary"
              class="pa-0 pt-2"
            >
              <v-list-item-icon v-if="item.icon">
                <v-icon> {{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-slot:appendIcon>
            <v-icon dark color="white">$expand</v-icon>
          </template>

          <v-list-item
            v-for="sublink in item.subLinks"
            :key="sublink.text"
            class="pl-12"
            @click="onSubLinkClicked(sublink.to)"
            :style="{background : sublink.isActive ? '#1A1925' : ''}"
          >
            <v-list-item-content>
              <v-list-item-title v-text="sublink.text"  style="color:white"/>
            </v-list-item-content>
          </v-list-item>

        </v-list-group>

      </div>
    </v-list>

    <template v-slot:append>
      <v-divider style="border: .3px solid rgba(255, 255, 255, .3)"></v-divider>
      <v-btn
        large
        text
        block id="logout-button"
        class="font-weight-bold text-uppercase text-button text-left"
        @click="logout()">
        Log out
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>
<style scoped>
#last-item {
  position: absolute;
  bottom: 0;
  width: 100%;
}
#sidebar {
  background: #272343;
}
.v-list-item{
  margin-bottom: 10px;
}
.v-list-item:hover{
  background-color: #4E4B63;
}

#logout-button {
  color: #59DCDC;
}

</style>
<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "sideBar",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            text: "Components"
          },
          {
            to: "/dashboard",
            icon: "mdi-view-dashboard",
            text: "Dashboard"
          },
          {
            icon: "mdi-tennis",
            text: "Players",
            subLinks: [
              {
                text: "Players list",
                to: "/players"
              },
              {
                text: "Import WTA Players",
                to: "/players/import"
              }
            ]
          },
          {
            to: "/tournaments",
            icon: "mdi-trophy",
            text: "Tournaments"
          }
        ]
      }
    }
  },
  data: () => ({
    user: {
      nama: "User",
      nomorInduk: "",

      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    isActive: false,
    refreshTrigger: false,
    darkmode: false
  }),
  created () {
    this.user.nomorInduk = this.identity.preferred_username

  },
  computed: {
    ...mapGetters({
      currentTheme: "theme/getCurrentColor",
      isDark: "theme/getIsDark"
    }),
    navItem () {
      return this.items.map((item) => {
        console.log(this.refreshTrigger)
        if (item.subLinks) {
          item.subLinks = item.subLinks.map((sublink) => {
            return { ...sublink, ...{ isActive: this.$route.path === sublink.to } }
          })
          return { ...item, ...{ isActive: this.isActive } }
        }
        return item
      })
    },
    identity: function () {
      return this.$store.getters.identity
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("deleteAuthStorage");
      location.reload();
    },
    collapseSubItems () {
      this.isActive = false
    },
    async onSubLinkClicked (to) {
      if (this.$router.currentRoute.path !== to) {
        await this.$router.push({ path: to })
      }
    },
    ...mapActions({
      toogleTheme: "theme/toogleDark"
    }),

  },
  watch: {
    darkmode (value) {
      if (value === this.isDark) return
      this.toogleTheme("alek")
    }
  }
}
</script>

<style scoped>
  .itemOnActive{
    background: #1A1925;
  }
</style>
