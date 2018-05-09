<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
            <b-navbar-brand to="/">ChampionInfo</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item>Current LoL Version: {{localVersion}}</b-nav-item>
                    <b-nav-item to="/topwinrate"> Top winrate</b-nav-item>
                    <b-button @click="Refresh" to="/"> Refresh</b-button>
                    <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
                </b-navbar-nav>
            </b-collapse>
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

</style>