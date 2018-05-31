<template>
    <div class="infocomponent">
      <v-alert :value="message" type="error">
      There is not enough Information 
    </v-alert>
    <v-tabs fixed-tabs dark slider-color="grey" v-model="role" >
      <v-tab v-for="(champion,index) in championsinfo" :key="index" v-cloak ripple >
        {{champion.role | role}}
      </v-tab>
      <v-tab-item v-for="(champion,index) in championsinfo" :key="index">
        <br>
        <h1>Champion: {{championName}}</h1>
        <h3>Runes:</h3>
        <img  class="imagesrunes " v-for="runes in champion.runes" :key="runes" v-bind:src="getPic(runes)">
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
      role: "",
      key: this.$route.params.key,
      championsinfo: [],
      runes: [],
      items: [],
      skills: [],
      message: false,
      mapIcon: {"8243":"TheUltimateHat.png"}
    };
  },
  async created() {
    await this.getRunesInfo();
    await this.getrunes();
    if (this.$route.params.role) {
      for (const key in this.championsinfo) {
        if (this.championsinfo.hasOwnProperty(key)) {
          if (this.championsinfo[key].role == this.$route.params.role) {
            this.role = key.toString();
          }
        }
      }
    } else {
      this.role = "0";
    }
    this.ready = true;
  },
  computed: {
    localVersion() {
      if (this.$store.state.localVersion == "") {
        this.$store.dispatch("getLoLCurrentVersion");
        return this.$store.state.lolVersion;
      } else {
        return this.$store.state.localVersion;
      }
    },
    championName() {
      let champion = this.$store.state.champions;
      for (const key in champion) {
        if (champion.hasOwnProperty(key)) {
          if (champion[key].key == this.key) {
            return champion[key].name;
          }
        }
      }
    }
  },
  methods: {
    getPic(index) {
      try {
        return require("../assets/Runes/" + index);
      } catch (error) {
        console.log(`There was a problem with getting rune: ${index}`);
      }
    },
    setSkills(data) {
      data.body.forEach(e => {
        if (e.hashes.skillorderhash) {
          this.skills = [];
          let splitSkills;
          if (e.hashes.skillorderhash.highestWinrate) {
            splitSkills = e.hashes.skillorderhash.highestWinrate.hash.split(
              "-"
            );
          } else {
            splitSkills = e.hashes.skillorderhash.highestCount.hash.split("-");
          }
          splitSkills.forEach(skill => {
            if (skill !== "skill") {
              this.skills.push(skill);
              for (let index = 0; index < this.championsinfo.length; index++) {
                if (this.championsinfo[index].role === e.role) {
                  // this.championsinfo[index]= {skills:this.skills,role: this.championsinfo[index].role,runes: this.championsinfo[index].runes,items:this.championsinfo[index].items}
                  this.championsinfo[index].skills = this.skills;
                }
              }
            }
          });
        }
      });
    },
    setRunes(data) {
      data.body.forEach(e => {
        if (e.hashes.runehash) {
          this.runes = [];
          let splitRunes;
          if (e.hashes.runehash.highestWinrate) {
            splitRunes = e.hashes.runehash.highestWinrate.hash.split("-");
          } else {
            splitRunes = e.hashes.runehash.highestCount.hash.split("-");
          }
          splitRunes.forEach(rune => {
            this.runes.push(this.mapIcon[rune]);
          });
          this.championsinfo.push({ role: e.role, runes: this.runes });
        }
      });
    },
    setItems(data) {
      data.body.forEach(e => {
        if (e.hashes.finalitemshashfixed) {
          this.items = [];
          let splitItems;
          if (e.hashes.finalitemshashfixed.highestWinrate) {
            splitItems = e.hashes.finalitemshashfixed.highestWinrate.hash.split(
              "-"
            );
          } else {
            splitItems = e.hashes.finalitemshashfixed.highestCount.hash.split(
              "-"
            );
          }
          splitItems.forEach(item => {
            if (item !== "items") {
              this.items.push(item);
              for (let index = 0; index < this.championsinfo.length; index++) {
                if (this.championsinfo[index].role === e.role) {
                  this.championsinfo[index].items = this.items;
                }
              }
            }
          });
        }
      });
    },
    async getRunesInfo() {
      try {
        let data = await this.$http.get(
          `http://ddragon.leagueoflegends.com/cdn/${
            this.localVersion
          }/data/en_US/runesReforged.json`
        );
        data.body.forEach(runeSlot => {
          runeSlot.slots.forEach(rune => {
            rune.runes.forEach(element => {
              let icon = element.icon.split("/");
              this.mapIcon[element.id] = icon[icon.length - 1];
            });
          });
        });
        this.mapIcon["8000"] = "Precision.png";
        this.mapIcon["8100"] = "Domination.png";
        this.mapIcon["8200"] = "Sorcery.png";
        this.mapIcon["8300"] = "Inspiration.png";
        this.mapIcon["8400"] = "Resolve.png";
      } catch (e) {
        console.log(e);
      }
    },
    async getrunes() {
      try {
        let data = await this.$http.get(
          "http://api.champion.gg/v2/champions/" + this.key,
          {
            params: {
              champData: "hashes",
              api_key: "1054371153781160d815be1fdbbc7625"
            }
          }
        );
        if (data.body.length != 0) {
          this.setRunes(data);
          this.setItems(data);
          this.setSkills(data);
        } else {
          this.message = true;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.infocomponent {
  margin: 50px 20px;
}
.imagesrunes {
  width: 80px;
  height: 80px;
}
</style>