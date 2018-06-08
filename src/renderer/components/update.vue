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
            {{this.data.data[0].body | mdFilter}}
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
    export default {
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
        filters:{
          mdFilter : function(data){
            return data.split('##')[1]
            
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