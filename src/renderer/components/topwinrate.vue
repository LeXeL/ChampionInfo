<template>
    <div>
        <v-container text-xs-center class="buttons">
            <v-layout>
                <v-flex>
                    <v-btn :ripple="false" @click.native="role = 'TOP'">TOP</v-btn>
                    <v-btn :ripple="false" @click.native="role = 'JUNGLE'">JUNGLE</v-btn>
                    <v-btn :ripple="false" @click.native="role = 'MIDDLE'">MID</v-btn>
                    <v-btn :ripple="false" @click.native="role = 'DUO_CARRY'">ADC</v-btn>
                    <v-btn :ripple="false" @click.native="role = 'DUO_SUPPORT'">SUPPORT</v-btn>
                    <v-btn :ripple="false" @click.native="role = ''">ALL</v-btn>
                    <span> Filter by: <span v-if="role">{{role | role}}</span><span v-else>ALL</span></span>
                </v-flex>
            </v-layout>
        </v-container>
        <v-data-table :pagination.sync="pagination"  :total-items="100" :headers="headers" :items="championWinRatedata | championRole(role)" hide-actions>
            <template slot="items" slot-scope="data">
                <td class="subheading">
                    <router-link v-bind:to="'/info/'+ data.item.championId+'/'+data.item.role">
                    <v-avatar>
                        <img :src="'http://ddragon.leagueoflegends.com/cdn/'+ localVersion +'/img/champion/'+ getChampionImageById(data.item.championId)" alt="">
                    </v-avatar>
                        <span class="champion-name"> {{getChampionNameById(data.item.championId)}} </span>
                    </router-link>
                </td>
                <td class="subheading">{{data.item.winRate | percentage}}</td>
                <td>{{data.item.role | role}}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                role: '',
                pagination:{
                    sortBy:'winRate',
                    descending:true
                },
                headers: [
                    {text:"Champion", value: "championId"},
                    {text:"Win Rate", value: "winRate"},
                    {text:"Role", value: "role"}
                ],
                //   {key:"", label: "",sortable: true}, {key:"", label: "",sortable: true} ],
                Champions: JSON.parse(localStorage.getItem("Champions")),
                championWinRatedata :[]
            }
        },
        async created(){
            await this.getWinrate()
        },
        filters:{
            percentage : function(value, decimals){
                if(!value) value = 0;
	            if(!decimals) decimals = 0;
                value = value * 100;
	            return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + "%";
            },
            championRole: function(input, role){
                var filteredList=[];
                if (!role){
                    return input
                }else{
                    input.forEach((element, index) => {
                        if (element.role === role){
                            filteredList.push(input[index])
                        }
                    });
                    return filteredList
                }
                
            },
        },
        methods:{
            async getWinrate(){
                try {
                    let response = await this.$http.get('http://api.champion.gg/v2/champions?sort=winRate-desc&api_key=1054371153781160d815be1fdbbc7625')
                    this.championWinRatedata = response.data;
                } catch (e) {
                    console.log(e);
                }
            },
            getChampionImageById(id){
                for (const key in this.Champions) {
                    if (this.Champions.hasOwnProperty(key)) {
                        if (this.Champions[key].key == id) {
                            return this.Champions[key].image.full;
                        }
                        
                    }
                }
            },
            getChampionNameById(id){
                for (const key in this.Champions) {
                    if (this.Champions.hasOwnProperty(key)) {
                        if (this.Champions[key].key == id) {
                            return this.Champions[key].name;
                        }
                        
                    }
                }
            }
        },
        computed:{
            localVersion(){
                return this.$store.state.localVersion
            }
        }

        
    }
</script>

<style scoped>
.buttons{
    margin-top: 50px;
}
img{
    margin-left: -20px;
    margin-right: 10px;
    height: 35px;
    width: 35px;
}
a{
    text-decoration: none;
}
a:link {
    color: white;
}

/* visited link */
a:visited {
    color: white;
}
a:hover {
    color: white;
}

</style>