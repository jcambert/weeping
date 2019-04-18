<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img :src="config.logo" :alt="config.alt" width="120" height="120">
                  <h1 class="flex my-4 primary--text">{{config.name}} Identification</h1>
                </div>                
                <v-form  ref="form" v-model="valid">
                    <v-text-field append-icon="person" name="licence" label="N° de Licence ou Nom" type="text" v-model="licence" required :rules="licenceRules"></v-text-field>
                    <v-text-field v-if="!isLicence()" append-icon="person" name="login" label="Prenom" type="text" v-model="prenom" required :rules="prenomRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading" :disabled="!formValid || loading">Entrer</v-btn>
                <v-btn v-on:click="clearForm()">Effacer</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Appconfig from "@/api/app";
import {userService} from '@/services/user'
export default {
  data: () => ({
    config:Appconfig,
    loading: false,
    licence: "905821",
    prenom: "",
    valid: false,
    licenceRules: [v => !!v || 'Votre numero de licence ou votre nom sont requis'],
    prenomRules: [v => !!v || 'Votre prenom est requis'],
  }),

  methods: {
    login () {
      this.loading = true;
     
     /* setTimeout(() => {
        this.$router.push('/dashboard');
      }, 1000);*/
    },
    clearForm() {
        this.$refs.form.reset();
    },
    isLicence() {
        return /^\d+$/.test(this.licence) || this.licence=="" || this.licence == undefined;
    },
  },
computed: {
    formValid:function() {
        return this.valid;
    }
},

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>