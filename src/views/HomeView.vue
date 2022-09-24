
<template>
 <div id="app">

<div class="login-page">
   <transition name="fade">
      <div v-if="!registerActive" class="wallpaper-login"></div>
   </transition>
   <div class="wallpaper-register"></div>

   <div class="container">
      <div class="row">
         <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div v-if="!registerActive && !forgetpassword" class="card login" v-bind:class="{ error: emptyFields }">
               <h1>Sign In</h1>
               <form class="form-group">
                  <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required>
                  <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required>
                  <input type="button" value="submit" class="btn btn-primary" @click="doLogin">
                  
                  <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                  </p>
                  <p><a href="#" @click="forgetpassword = !forgetpassword,emptyFields=false">Forg ot your password?</a></p>
               </form>
            </div>



            <div v-else-if="!emptyFields && !forgetpassword" class="card register" v-bind:class="{ error: emptyFields }">
               <h1>Sign Up</h1>
               <form class="form-group">
                <input v-model="nameReg" type="text" class="form-control" placeholder="Name" required>
                  <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                  <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                  <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                  <input type="button" value="submit" class="btn btn-primary" @click="doRegister">
                  
                  <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                  </p>
               </form>
            </div>

            <div v-else-if="!registerActive && !emptyFields" class="card login" v-bind:class="{ error: emptyFields }">
               <h1>Email Address</h1>
               <form class="form-group">
                  <input v-model="forgetPasswordEmail" type="email" class="form-control" placeholder="Email" required>
                 
                  <input type="button" value="submit" class="btn btn-primary" @click="forgetPassword">
                  <p>Don't have an account? <a href="#" @click="forgetpassword = !forgetpassword, emptyFields = false">Sign in here</a>
                  </p>
    
               </form>
            </div>
         </div>
      </div>

   </div>
</div>

</div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../store/config';
  export default{
  name:"HomeView",
  data(){
    return {
        registerActive: false,
        forgetpassword:false,
        emailLogin: "",
        passwordLogin: "",
        nameReg:"",
        emailReg: "",
        passwordReg: "",
        confirmReg: "",
        forgetPasswordEmail:"",
        emptyFields: false
    }
     },

     mounted(){

      if(this.$store.state.token!==''){
          this.$router.push({ path: '/dashboard'})
          this.$router.push({ name: 'dashboard' })
      }
     },

     methods:{

      doLogin(){
       
       
        
         if (this.emailLogin === "" || this.passwordLogin === "") {
            this.emptyFields = true;
         } else {

          axios.post(API_URL+'/login',{email:this.emailLogin,password:this.passwordLogin}).then((response)=>{
           console.log(response.data);
           this.$router.push({ path: '/dashboard'});
           if(response.data){
            this.$store.commit('setToken',response.data.access_token)

           }
          }).catch(function (error) {
              console.log(error);
            });

         }
      },
      
      doRegister(){
        
         if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
            this.emptyFields = true;
         } else {
          axios.post(API_URL+'/register',{name:this.nameReg,email:this.emailReg,password:this.passwordReg}).then((response)=>{
            console.log(response.data);
          }).catch(function (error) {
              console.log(error);
            });

         }
      },

      forgetPassword(){
        if(this.forgetPasswordEmail===""){
          this.emptyFields = true
        }else{
          axios.post(API_URL+'/forget_password',{email:this.forgetPasswordEmail}).then((response)=>{
            console.log(response.data);
          }).catch(function (error) {
              console.log(error);
            });


        }
      }
   }
    }
     
     
  </script>



<style scoped>
 

 p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group input {
  margin-bottom: 20px;
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
.login-page .wallpaper-login {
  background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
}
.login-page .fade-enter-active,
.login-page .fade-leave-active {
  transition: opacity 0.5s;
}
.login-page .fade-enter,
.login-page .fade-leave-to {
  opacity: 0;
}
.login-page .wallpaper-register {
  background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: -1;
}
.login-page h1 {
  margin-bottom: 1.5rem;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
  </style> 
