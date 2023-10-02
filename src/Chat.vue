<template>
    <div>     
      <template v-if="login">
        <Toolbar />
      </template>
    </div>
  </template>
  
  <script setup>
    import Toolbar from './components/Chat/Toolbar.vue';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { onMounted } from 'vue';
    const store = useStore();
    const login = ref(false);
    onMounted(() => {console.log('Usuario almacenado en la store:', store.state.user.usuario.displayName);
    if(store.state.user.usuario !=null){
        login.value=true
    }else{
        login.value=false
    }
  console.log('El componente se ha montado en la vista.');
  console.log(login.value);
});
  
  
  
  </script>
  