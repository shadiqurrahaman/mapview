<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Logout</button>
    <button @click="history">History</button>
    
    <div>
      <form class="form-group">
        <input v-model="searchAddress" type="text" class="form-control" placeholder="Search" required>        
        <input type="button" value="Search" class="btn btn-primary" @click="search">       
    </form>
    </div>
    <div v-if="choose" class="choose">
        <p>{{pacename}}</p>
        <button> Add</button>
    </div>

    <GoogleMap api-key="AIzaSyCrmpgqwB9cKbegTayT18_I8OtjcgL9wFU" style="width: 100%; height: 500px" :center="center" :zoom="15">
      
      <Marker :options="{ position:history[1] }" />

  </GoogleMap>
  </div>
</template>
<script>
import { GoogleMap, Marker } from "vue3-google-map";
import axios from 'axios';
import { API_URL } from '../store/config';
 export default{
  components: { GoogleMap, Marker },
  name:"AboutView",
  data(){
    return{
      pacename:'',
      choose:false,
      searchAddress : "",
      // center :{ lat: 40.689247, lng: -74.044502 },
      center :{ lat: 23.7805733, lng: 90.2791936 },
      history:[
      { lat: 23.7805733, lng: 90.2791936 },
      { lat: 40.689247, lng: -74.044502 },
      {lat:23.7805733,lng:90.2791936}

      ]
    }
  },
  mounted(){

if(this.$store.state.token==''){
    this.$router.push({ path: '/'})
}
},
  methods:{
    search(){    
      this.center={lat:23.7805733,lng:90.2791936}
      this.pacename = this.searchAddress;
      this.choose=true;
    },

    logout(){

      // this.$store.commit('clearToken')

      let config = {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.token
            }
      }
    axios.get(API_URL+'/logout',config).then((response)=>{
           console.log(response.data);
           this.$router.push({ path: '/'});
           if(response.data){
            this.$store.commit('clearToken')

           }
          }).catch(function (error) {
              console.log(error);
            })
  }
    },
    history(){

    }
  
 }


</script>
<style>
.choose{
  display: inline-flex;
}
</style>
