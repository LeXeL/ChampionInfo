<template>
    <v-container >
        <div class="show-Champions">
            <v-text-field  prepend-icon="search" flat type="text" placeholder="Champion Name" class="form-control searchbar" v-model="name"><v-icon>search</v-icon></v-text-field>
            <div v-for="champion in ChampionName" class="col-2 champions center-block" :key="champion.id">
                <!-- <transition name="fade" mode="out-in"> -->
                    <router-link v-bind:to="'/info/'+champion.key">
                        <img class="img-champions align-self-center mr-3" v-bind:src="'http://ddragon.leagueoflegends.com/cdn/'+ localVersion +'/img/champion/'+ champion.image.full ">              
                    </router-link>
                    <br>
                    <p class="champion-name"> {{champion.name}} </p>
                <!-- </transition> -->
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            name: ""
        };
    },
    async created() {
        try {
            await this.$store.dispatch('getLoLCurrentVersion');
            let lolCurrentVersion = this.$store.state.lolVersion;
            let tempsplit = lolCurrentVersion.split('.');
            let localVersion = this.$store.state.localVersion || '0';
            if(parseInt(localVersion) <= parseInt(tempsplit.join(''))){
                this.$store.commit('setLocalVersion',lolCurrentVersion)
            }
            this.getChampions();
        } catch (e) {
            console.log(e)   
        }

    },
    methods: {
        async getChampions(){
            await this.$store.dispatch('getChampionInfo')
        }
    },
    computed: {
        ChampionName: function(){
            return this._.pickBy(this.champions,(value,key)=>{
                let re = new RegExp('(.)*' + this.name.toUpperCase() + '(.)*');
                return re.exec(this.champions[key].name.toUpperCase());
            });
        },
        champions: function(){
            return this.$store.state.champions
        },
        localVersion: function(){
            return this.$store.state.localVersion
        }

    }
};
</script>
<style scoped>
.show-Champions {
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
    margin-left: -20px;
    font-weight: bold;

}
.searchbar{
    width: 90%;
}
</style>
