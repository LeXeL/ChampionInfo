<template>
    <div>
        <div>
            <button @click="role = 'TOP'">TOP</button>
            <button @click="role = 'JUNGLE'">JUNGLE</button>
            <button @click="role = 'MIDDLE'">MID</button>
            <button @click="role = 'DUO_CARRY'">ADC</button>
            <button @click="role = 'DUO_SUPPORT'">SUPPORT</button>
            <span> Filter by: <span v-if="role">{{role | role}}</span><span v-else>ALL</span></span>
            
        </div>
        <b-table :fields="fields" :items="championWinRatedata | championRole(role)">
            <template slot="index" slot-scope="data">
                {{data.index + 1}}
            </template>
            <template slot="winRate" slot-scope="data">
                {{data.item.winRate | percentage}}
            </template>
            <template slot="role" slot-scope="data">
                {{data.item.role | role}}
            </template>
            <template slot="championId" slot-scope="data">
                <router-link v-bind:to="'/info/'+ data.item.championId">
                    <img :src="'http://ddragon.leagueoflegends.com/cdn/'+ localVersion +'/img/champion/'+ getChampionImageById(data.item.championId)" alt="">
                    <span> {{getChampionNameById(data.item.championId)}} </span>
                </router-link>
            </template>
            
        </b-table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                role: '',
                fields: [ 'index',{key:"championId", label: "Champion"}, {key:"winRate", label: "Win Rate",sortable: true}, {key:"role", label: "Role",sortable: true} ],
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
img{
    height: 35px;
    width: 35px;
}
.filter-bar{
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;
    height: 20px;
    
}
</style>