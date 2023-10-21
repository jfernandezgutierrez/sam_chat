<template>
  <v-app>
    <v-navigation-drawer
      app
      absolute
      :height="drawerHeight"
      v-model="drawerIsOpen"
    >
      <!-- Contenido del drawer -->
      <UserListVue />
    </v-navigation-drawer>

    <v-app-bar app dark color="#4CAF50">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ NombreUsuario }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="cerrarSesion" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- Contenido principal de la aplicación -->
    </v-main>
  </v-app>
</template>
  <script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { auth } from "@/firebase";
import { useRouter } from "vue-router";
import UserListVue from "../ListaUsers/UserList.vue";
//const
const router = useRouter();
const NombreUsuario = ref("");
const store = useStore();
const drawerHeight = ref(200);
//let
let drawerIsOpen = ref(false); // Estado inicial del drawer (cerrado)
let mostrarLista = ref(false);
onMounted(() => {
  NombreUsuario.value = store.state.user.usuario.displayName;
  console.log(NombreUsuario.value);
});
//funciones
const redirectToChat = () => {
  router.push({ name: "Login" }).catch((err) => {
    if (err.name !== "NavigationDuplicated") {
      throw err;
    }
  });
};
function cerrarSesion() {
  auth
    .signOut()
    .then(() => {
      // Cierre de sesión exitoso
      console.log("Usuario cerró sesión");
      redirectToChat();
    })
    .catch((error) => {
      // Manejar errores de cierre de sesión, si es necesario
      console.error("Error al cerrar sesión:", error);
    });
}
function toggleDrawer() {
  drawerIsOpen.value = !drawerIsOpen.value; // Cambiar el estado del drawer al hacer clic en el icono de la barra de aplicación
}
</script>