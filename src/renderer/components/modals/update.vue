<template>
    <div>
    <v-dialog v-model="internalDialog" persistent max-width="290">
      <v-card v-if="internalDialog">
        <v-card-title class="headline">New Update Avaliable</v-card-title>
        <v-card-text>
          <div>
            Version: {{this.data.data[0].name}}
          </div>
          <div>
            <vue-markdown>{{this.data.data[0].body }}</vue-markdown>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click.native="close">I will restart later</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="sendtoUpdate">Restart Now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import electron from 'electron'
import VueMarkdown from 'vue-markdown'

    export default {
        components: {
          VueMarkdown
        },
        props:{
          dialog:Boolean
        },
        async created(){
          this.data = await this.$http.get('https://api.github.com/repos/LeXeL/ChampionInfo/releases');
        },
        data(){
            return {
              data:[]
            }
        },
        computed:{
          internalDialog(){
            return this.dialog
          }
        },
        methods:{
          sendtoUpdate(){
            electron.ipcRenderer.send('Update')
          },
          close(){
            this.$emit('update:dialog',false)
          }
        }
    }
</script>

<style scoped>

</style>