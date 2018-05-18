<template>
    <v-container >
        <div class="row show-Champions">
            <input type="text" placeholder="Champion Name" class="form-control searchbar" v-model="name">
            <div v-for="champion in ChampionName" class="col-2 champions center-block" :key="champion.id">
                <!-- <transition name="fade" mode="out-in"> -->
                    <router-link v-bind:to="'/info/'+champion.key">
                        <img class="img-champions align-self-center mr-3" v-bind:src="'http://ddragon.leagueoflegends.com/cdn/'+ localVersion +'/img/champion/'+ champion.image.full ">              
                    </router-link>
                    <br>
                    <p class="champion-name "> {{champion.name}} </p>
                <!-- </transition> -->
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
        champions: [],
        localVersion: "",
        name: "",
        lolcurrentVersion:''
        };
    },
    async created() {
        try {
            let data = await this.$http.get("https://ddragon.leagueoflegends.com/api/versions.json")
            let tempsplit = data.body[0].split('.');
            this.lolcurrentVersion = data.body[0];
            this.localVersion = JSON.parse(localStorage.getItem("Version") || '0');
            // console.log(`Local Version: ${this.localVersion} -> LolCurrentVersion: ${this.lolcurrentVersion}`)
            if(parseInt(this.localVersion) <= parseInt(tempsplit.join(''))){
                this.localVersion = this.lolcurrentVersion;
                localStorage.setItem("Version",JSON.stringify(this.lolcurrentVersion));
                this.$store.commit('setVersion',this.localVersion)
                this.getChampions();
            }else{
                this.getChampions();
            }
        } catch (e) {
            console.log(e)   
        }

    },
    methods: {
        async getChampions(){
            if (!localStorage.getItem("Champions")) {
                try {
                    let data = await this.$http.get("http://ddragon.leagueoflegends.com/cdn/" +this.localVersion +"/data/en_US/champion.json")
                    this.champions = data.body.data;
                    localStorage.setItem("Champions",JSON.stringify(this.champions));
                } catch (e) {
                    console.log(e)
                }
            }else{
                this.champions = JSON.parse(localStorage.getItem("Champions"));
            }
        }
    },
    computed: {
        ChampionName: function(){
            return this._.pickBy(this.champions,(value,key)=>{
                let re = new RegExp('(.)*' + this.name.toUpperCase() + '(.)*');
                return re.exec(key.toUpperCase());
            });
        }
    }
};
</script>
<style scoped>
.show-Champions {
    max-width: 450px;
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    text-align: center;
}
.champions {
    margin: 10px;
    display: inline-block;
    text-align: center;
}
.img-champions {
    max-height: 50px;
    max-width: 50px;
}
.btn {
    margin: 0 5px;
}
.champion-name{
    text-align: center;
    font-weight: bold;

}
.searchbar{
    margin: 10px;
}
</style>
