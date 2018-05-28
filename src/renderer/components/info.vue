<template>
    <div class="infocomponent">
    <v-tabs fixed-tabs dark slider-color="grey" v-model="role" >
      <v-tab v-for="(champion,index) in championsinfo" :key="index" v-cloak ripple >
        {{champion.role | role}}
      </v-tab>
      <v-tab-item v-for="(champion,index) in championsinfo" :key="index">
        <br>
        <h3>Runes:</h3>
        <img  class="images-runes " v-for="runes in champion.runes" :key="runes" v-bind:src="getPic(runes)">
        <div>
          <h3>Items:</h3>
          <div class="items">
            <img v-for="(items,index) in champion.items" :key="items+index" v-bind:src="`http://ddragon.leagueoflegends.com/cdn/${localVersion}/img/item/${items}.png`">
          </div>
        </div>
        <h3>Skills:</h3>
        <span v-for="(skills,index) in champion.skills" :key="index" class="headline">{{skills}}<span v-if="index+1 < champion.skills.length ">-></span></span>
      </v-tab-item>
    </v-tabs>
    <v-btn @click="$router.go(-1)" class="btn">Go Back</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ready: false,
            role:'',
            key: this.$route.params.key,
            championsinfo: [],
            runes: [],
            items:[],
            skills:[],
            mapIcon: {"8000":"Precision.png","8005":"PressTheAttack.png","8008":"FlowofBattleTemp.png","8009":"LastResortIcon.png","8010":"Conqueror.png","8014":"CoupDeGrace.png","8017":"CutDown.png","8021":"FleetFootwork.png","8100":"Domination.png","8105":"RelentlessHunter.png","8112":"Electrocute.png","8120":"GhostPoro.png","8124":"Predator.png","8126":"CheapShot.png","8128":"DarkHarvest.png","8134":"IngeniousHunter.png","8135":"RavenousHunter.png","8136":"ZombieWard.png","8138":"EyeballCollection.png","8139":"GreenTerror_TasteOfBlood.png","8143":"SuddenImpact.png","8200":"Sorcery.png","8210":"Transcendence.png","8214":"SummonAery.png","8224":"Pokeshield.png","8226":"ManaflowBand.png","8229":"ArcaneComet.png","8230":"PhaseRush.png","8232":"Waterwalking.png","8233":"AbsoluteFocus.png","8234":"CelerityTemp.png","8236":"GatheringStorm.png","8237":"Scorch.png","8242":"Unflinching.png","8243":"TheUltimateHat.png","8299":"LastStand.png","8300":"Inspiration.png","8304":"MagicalFootwear.png","8306":"HextechFlashtraption.png","8313":"PerfectTiming.png","8316":"MinionDematerializer.png","8321":"FuturesMarket.png","8326":"UnsealedSpellbook.png","8345":"BiscuitDelivery.png","8347":"CosmicInsight.png","8351":"GlacialAugment.png","8352":"TimeWarpTonic.png","8359":"Kleptomancy.png","8360":"UnsealedSpellbook.png","8400":"Resolve.png","8410":"ApproachVelocity.png","8429":"Conditioning.png","8437":"GraspOfTheUndying.png","8439":"VeteranAftershock.png","8444":"SecondWind.png","8446":"Demolish.png","8451":"Overgrowth.png","8453":"Revitalize.png","8463":"FontOfLife.png","8465":"Guardian.png","8472":"Chrysalis.png","8473":"BonePlating.png","9101":"Overheal.png","9103":"Legend_Infamy.png","9104":"Legend_Heroism.png","9105":"Legend_Tenacity.png","9111":"DangerousGame.png"}
        };
    },
    async created() { 
        await this.getRunesInfo();            
        await this.getrunes();
        if (this.$route.params.role){
          for (const key in this.championsinfo) {
            if (this.championsinfo.hasOwnProperty(key)) {
              if(this.championsinfo[key].role == this.$route.params.role){
                this.role = key.toString();
              }
              
            }
          }
        }else{
          this.role = '0'
        }
        this.ready = true;
  
    },
    computed:{
      localVersion(){
          return this.$store.state.localVersion
      }
    },
    methods: {
        getPic(index) {
            return require("../assets/Runes/" + index);
        },
        setSkills(data){
          data.body.forEach(e => {
            if (e.hashes.skillorderhash) {
              this.skills = [];
              let splitSkills
              if (e.hashes.skillorderhash.highestWinrate){
                splitSkills = e.hashes.skillorderhash.highestWinrate.hash.split("-");
              }else{ 
                splitSkills = e.hashes.skillorderhash.highestCount.hash.split("-");
              } 
              splitSkills.forEach(skill => {
                if(skill !== "skill"){
                  this.skills.push(skill);
                  for (let index = 0; index < this.championsinfo.length; index++) {
                    if(this.championsinfo[index].role === e.role){
                      // this.championsinfo[index]= {skills:this.skills,role: this.championsinfo[index].role,runes: this.championsinfo[index].runes,items:this.championsinfo[index].items}
                      this.championsinfo[index].skills = this.skills
                    }     
                  }
                }
              });
            }
          });
        },
        setRunes(data){
          data.body.forEach(e => {
            if (e.hashes.runehash) {
              this.runes = [];
              let splitRunes
              if (e.hashes.runehash.highestWinrate){
                splitRunes = e.hashes.runehash.highestWinrate.hash.split("-");
              }else{ 
                splitRunes = e.hashes.runehash.highestCount.hash.split("-");
              } 
              splitRunes.forEach(rune => {
                this.runes.push(this.mapIcon[rune]);
              });
              this.championsinfo.push({role: e.role, runes: this.runes });
            }
          });
        },
        setItems(data){
          data.body.forEach(e => {
            if (e.hashes.finalitemshashfixed) {
              this.items = [];
              let splitItems
              if (e.hashes.finalitemshashfixed.highestWinrate){
                splitItems = e.hashes.finalitemshashfixed.highestWinrate.hash.split("-");
              }else{ 
                splitItems = e.hashes.finalitemshashfixed.highestCount.hash.split("-");
              } 
              splitItems.forEach(item => {
                if(item !== "items"){
                  this.items.push(item);
                  for (let index = 0; index < this.championsinfo.length; index++) {
                    if(this.championsinfo[index].role === e.role){
                      this.championsinfo[index].items = this.items
                    }     
                  }
                }
              });
            }
          });
        },
        async getRunesInfo(){
          try {
            let data = await this.$http.get("http://ddragon.leagueoflegends.com/cdn/8.8.1/data/en_US/runesReforged.json")
            data.body.forEach(rune => {
            let icon = rune.icon.split("/");
              this.mapIcon[rune.id.toString()] = icon[icon.length - 1];
            });
            this.mapIcon["8000"] = "Precision.png";
            this.mapIcon["8100"] = "Domination.png";
            this.mapIcon["8200"] = "Sorcery.png";
            this.mapIcon["8300"] = "Inspiration.png";
            this.mapIcon["8400"] = "Resolve.png";
            localStorage.setItem("mapIcon",JSON.stringify(this.mapIcon));
          } catch (e) {
              console.log(e)
          }
          },
    async getrunes() {
      try {
        let data = await this.$http.get("http://api.champion.gg/v2/champions/" + this.key, {
          params: {
            champData: "hashes",
            api_key: "1054371153781160d815be1fdbbc7625"
          }
        })
        this.setRunes(data);
        this.setItems(data);
        this.setSkills(data);
      } catch (e) {
        console.log(e)
      }
      
    }
  }
};
</script>

<style scoped>
.infocomponent{
  margin: 50px 20px;
}
.images-runes{
  size:40px;
}
</style>