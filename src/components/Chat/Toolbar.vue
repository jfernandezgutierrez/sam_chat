<template>
    <div>
      <v-toolbar
        dark
        prominent
        color="#B2FF59"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>{{NombreUsuario}}</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn @click="cerrarSesion" icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
  </template>
  <script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { auth } from '@/firebase'; 
import { useRouter } from 'vue-router';
const router = useRouter();
const NombreUsuario = ref('');
const store = useStore();

onMounted(() => {
  NombreUsuario.value = store.state.user.usuario.displayName;
  console.log(NombreUsuario.value);
});
//funciones
const redirectToChat = () => {
  router.push({ name: 'Login' }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};
function cerrarSesion() {
  auth.signOut().then(() => {
    // Cierre de sesión exitoso
    console.log('Usuario cerró sesión');
    redirectToChat();
  }).catch((error) => {
    // Manejar errores de cierre de sesión, si es necesario
    console.error('Error al cerrar sesión:', error);
  });
}
</script>