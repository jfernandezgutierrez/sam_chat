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
                <v-text-field type="password" v-model="passwordR" :rules="rules" label="Password"></v-text-field>
                <v-text-field type="password" v-model="passwordRD" :rules="rules" label="Password"></v-text-field>
              </v-container>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn :disabled="!rulesR()" @click="registro">
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
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ref } from 'vue';
import { auth } from '@/firebase';
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
const rulesR = ()=>{
if(esCorreoElectronicoValido(correoR.value)&& userNameR.value !=""&& passwordR.value!=""&& passwordR.value == passwordRD.value){
  return true;
}
};

//funciones
function esCorreoElectronicoValido(correo) {
  // Lógica de validación para correo electrónico (por ejemplo)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};
async function  registro(){
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correoR.value, passwordR.value);

    // Usuario registrado correctamente
    const user = userCredential.user;
    console.log('Usuario registrado:', user);

    // Envía un correo electrónico de verificación
    await sendEmailVerification(user);

    // Correo electrónico de verificación enviado
    console.log('Correo de verificación enviado.');
  } catch (error) {
    // Manejar errores de registro
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error al registrar usuario:', errorCode, errorMessage);
  }

};

</script>
