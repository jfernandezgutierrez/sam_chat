<template>
  <div>
    <h1>Lista de Usuarios</h1>
    <ul>
      <li v-for="user in users" :key="user.uid" class="list-item"><v-btn rounded block >
      {{ user.displayName }}
    </v-btn></li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, onMounted } from 'vue';
import { db, auth } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';


const users = ref([]);
const drawerIsOpen = ref(false); // Estado inicial del drawer (cerrado)
onMounted(async () => {
const usersCollection = collection(db, 'usuarios');

  try {
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
      users.value.push(doc.data());
    });
    console.log(users)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
});
onBeforeMount(() => {
  // Lógica que se ejecutará antes de que el componente se monte en el DOM
  console.log('Before Mount Hook');
  // Verificar cuando se abre el drawer
  window.addEventListener('resize', checkDrawerStatus);
  checkDrawerStatus();
  
});

function checkDrawerStatus() {
  drawerIsOpen.value = window.innerWidth > 600; // Puedes ajustar este valor según tus necesidades
}

</script>
<style scoped>
.list-item {
  margin-bottom: 15px; /* Espacio entre elementos de la lista */
}
</style>