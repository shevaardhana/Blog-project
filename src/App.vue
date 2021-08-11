<template>
  <!-- App.vue -->
  <v-app>
    <!--membuat snackbar-->
    <Alert />
    <Dialog />

    <!-- Nav Drawer kiri -->
    <v-navigation-drawer app v-model="drawer">
      <!-- diambil dari data drawer yang dibuat dibawah, nnti dia reaktif true/false -->
      <v-list>
        <!-- Buat v-list isinya ada v-item, v-list-avatar, v-list-content // Jadi nanti buat siapa yang login keliatan foto avatar dan namanya-->
        <v-list-item v-if="!guest">
          <!-- v-list untuk avatar -->
          <v-list-item-avatar>
            <v-img
              :src="
                user.photo_profile
                  ? apiDomain + user.photo_profile
                  : 'https://randomuser.me/api/portraits/lego/8.jpg'
              "
            ></v-img>
          </v-list-item-avatar>
          <!-- v-list untuk content -->
          <v-list-item-content> Hello, 
            <v-list-item-title>{{ user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- membuat button jika status user nya tamu maka dibuat tombol login dan register-->
        <div class="pa-2" v-if="guest">
          <v-btn block color="primary" class="mb-1" @click="login">
            <v-icon left>mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="success" @click="register">
            <v-icon left>mdi-account</v-icon>
            Register
          </v-btn>
        </div>

        <v-divider></v-divider>

        <!-- looping dengan directive v-for untuk data "menus" -->
        <v-list-item
          v-for="(item, index) in menus"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <!-- route yang udah dibuat di data menus -->
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
            <!-- icon nya dikiri maka nya pake v-icon left -->
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- sudah login dan status guest nya jadi false, maka akan menampilkan button logout -->
      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="green" dark to="/addPost">
            <v-icon left>mdi-message-plus</v-icon>
              Add Blog Post
            </v-btn>
            </div>
          <v-divider></v-divider>

          <div class="pa-2">
          <v-btn block color="red" dark @click="logout">
            <v-icon left>mdi-lock</v-icon>
            logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Nav bar atas-->
    <v-app-bar app color="black" dark>
      <!-- Success bisa diganti warna lain seperti blue, alert, warning, dll -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>SanbercodeApp</v-toolbar-title>

      <!-- pemisah konten -->
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer app> @Sanbercode | VueJS </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert"),
    Dialog: () => import("./components/Dialog"),
  },

  data: () => ({
    drawer: false, //kl true drawer samping akan menampilkan info akun yang login(avatar dan nama), serta menu(home,blogs)
    menus: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Blogs", icon: "mdi-note", route: "/blogs" },
      { title: "Posts", icon: "mdi-message-text", route: "/posts"}
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com",

    //guest : false, //kl true ini akan menampilkan halaman dengan button login dan register. Sekarang di masukin ke mapGetters
    //snackbarStatus : false,
    //snackbarText : 'Anda berhasil login'
  }),

  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },

  methods: {
    logout() {
      let config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/logout",
        headers: {
          Authorization: "Bearer" + this.token,
        },
      };

      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});

          this.setAlert({
            status: true,
            color: "success",
            text: "Anda berhasil logout",
          });
        })
        .catch((responses) => {
          this.setAlert({
            status: true,
            color: "success",
            text: responses.data.error,
          });
        });
    },

    login() {
      this.setDialogComponent({ component: "login" });
    },

    register() {
      this.setDialogComponent({ component: "register" });
    },
    
    ...mapActions({
      setAlert: "alert/set",
      setDialogComponent: "dialog/setComponent",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),
  },

  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
  //this.snackbarStatus = true
  //}
};
</script>
