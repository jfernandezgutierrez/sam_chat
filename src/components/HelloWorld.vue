<template>
  <v-container v-if="login">
    <v-container align="center" justify="center">
      <v-col cols="auto">
        <v-card class="mx-auto" max-width="344">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">

              </div>
              <div class="text-h6 mb-1">
                Login
              </div>
              <v-container>
                <v-text-field v-model="correo" :rules="rules" label="Correo"></v-text-field>
                <v-text-field v-model="password" :rules="rules" label="Password"></v-text-field>
              </v-container>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn>
              Entrar
            </v-btn>
            <v-btn @click="botonRegistrar">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>
  </v-container>
  <v-container v-if="register">
    <v-container align="center" justify="center">
      <v-col cols="auto">
        <v-card class="mx-auto" max-width="344">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">

              </div>
              <div class="text-h6 mb-1">
                Register
              </div>
              <v-container>
                <v-text-field v-model="correoR" :rules="rules" label="Correo"></v-text-field>
                <v-text-field v-model="userNameR" :rules="rules" label="Nombre de usuario"></v-text-field>
                <v-text-field v-model="passwordR" :rules="rules" label="Password"></v-text-field>
                <v-text-field v-model="passwordRD" :rules="rules" label="Password"></v-text-field>
              </v-container>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn>
              Registrar
            </v-btn>
            <v-btn @click="botonRegistrar">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
//variables reactivas
const login = ref(true);
const register = ref(false);

const userNameR = ref('');
const password = ref('');
const passwordR = ref('');
const correoR = ref('');
const correo = ref('');
const passwordRD = ref('');
//variables normales
const botonRegistrar = () => {
  if (login.value == true) {
    login.value = false;
    register.value = true;
  } else {
    login.value = true;
    register.value = false;
  }

  console.log(login.value)
};
</script>
