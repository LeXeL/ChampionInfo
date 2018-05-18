<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand class="brand" to="/">ChampionInfo</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>Current LoL Version: {{localVersion}}</b-nav-item>
                    <b-nav-item to="/topwinrate"> Top winrate</b-nav-item>
                    <b-button @click="Refresh" to="/"> Refresh</b-button>
                    <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>
            </b-collapse>
        <div id="togglers">
            <div id="minimize"><span>-</span>
            </div>
            <div id="close"><span>&times;</span>
            </div>
        </div>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        methods:{
            Refresh(){
                localStorage.clear();
                this.$router.go('/')
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

nav{
  width: 100%;
  height: 50px;
  -webkit-app-region: drag;
  cursor: move;
}

*{
  font-family: arial;
}

#togglers {
    color: #f7f7f7;
    text-align: center;
    -webkit-app-region: drag;
    cursor: move;
    font-weight: bold;
}
#minimize{ 
    display:inline; 
    font-size: 25px; 
    margin-right: 4px;
}
#close{
   display:inline;
    font-size: 25px;
}
</style>