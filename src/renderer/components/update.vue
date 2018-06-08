<template>
    <div>
    <v-dialog v-model="internalDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">New Update Avaliable:</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="dialog = false">Wait</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Install Now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import electron from 'electron'
    export default {
        props:{
          dialog:Boolean
        },
        data(){
            return {
              
            }
        },
        computed:{
          internalDialog(){
            return this.dialog
          }
        }
    }
</script>

<style scoped>

</style>