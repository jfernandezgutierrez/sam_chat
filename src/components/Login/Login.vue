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
            <v-btn @click="iniciarSesion">
              Entrar
            </v-btn>
            <v-btn @click="botonRegistrar">
              Register
            </v-btn>
            <v-btn @click="iniciarSesionConGoogle">
              <span class="mdi mdi-google"></span> oogle
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
import { createUserWithEmailAndPassword, sendEmailVerification,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,updateProfile   } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';
import { useStore } from 'vuex';
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
const db = getFirestore();
const usuariosCollection = collection(db, "usuarios");
const router = useRouter();
const store = useStore();
const redirectToChat = () => {
  router.push({ name: 'Chat' }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

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
    await updateProfile(user, { displayName: userNameR.value });
    // Envía un correo electrónico de verificación
    await sendEmailVerification(user);

    // Correo electrónico de verificación enviado
    console.log('Correo de verificación enviado.');
     await addDoc(usuariosCollection, {
      uid: user.uid,
      email: user.email,
      displayName: userNameR.value,
      // Otros campos que desees guardar en la base de datos
    });
    correoR.value="";
    passwordR.value="";
    passwordRD.value="";
    register.value=false;
    login.value=true;
  } catch (error) {
    // Manejar errores de registro
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error al registrar usuario:', errorCode, errorMessage);
  }

};
async function iniciarSesion(){
  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo.value, password.value);
    const user = userCredential.user;
    console.log('Usuario autenticado:', user);
    store.dispatch('setUsuario', user);
    redirectToChat()
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
}
async function iniciarSesionConGoogle (){
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    console.log('Usuario autenticado con Google.');
    store.dispatch('setUsuario', user);
    console.log('Usuario almacenado en la store:', user);
    await addDoc(usuariosCollection, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // Otros campos que desees guardar en la base de datos
    });
    redirectToChat()
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
};
</script>
