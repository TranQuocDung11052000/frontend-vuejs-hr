<template>
  <div class="container">
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typeEmailX">Email</label>
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      v-model="postlogin.email"
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typePasswordX"
                      >Password</label
                    >
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                      v-model="postlogin.password"
                    />
                  </div>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    @click="login"
                  >
                    Login
                  </button>

                  <div
                    class="d-flex justify-content-center text-center mt-4 pt-1"
                  >
                    <a href="#!" class="text-white"
                      ><i class="fab fa-facebook-f fa-lg"></i
                    ></a>
                    <a href="#!" class="text-white"
                      ><i class="fab fa-twitter fa-lg mx-4 px-2"></i
                    ></a>
                    <a href="#!" class="text-white"
                      ><i class="fab fa-google fa-lg"></i
                    ></a>
                  </div>
                </div>

                <div>
                  <p class="mb-0">
                    Don't have an account?
                    <router-link to="register" class="text-white-50 fw-bold">Sign Up</router-link>
                  </p>

                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return {
           Role:'abc',
            data:'',
            postlogin:{
            action:'login',
            email:'',
            password:''}
        }
    },
    created(){
      //checklogin()
    },
    methods:{
      checklogin: function(){
        if (localStorage.getItem('token'))
        {
          this.$router.push({path:"userlist"})
        }
        
      },
        ...mapMutations(['checkLogin']),
        ...mapMutations(['checkRole']),
        login(){
            axios.post("http://localhost/WebQLNS/server/api/authen.php", {
                "action":this.postlogin.action,
                "email": this.postlogin.email,
                "password": this.postlogin.password
            }
            )
            .then(
                response=>{
                 this.data=response.data
                 this.Role=(this.data.role);
                 console.log(this.Role);
                 if(this.data.status==1){
                    localStorage.setItem('token',this.data.token)
                    localStorage.setItem('role',this.Role)
                    localStorage.setItem('id',this.data.id)
                    this.$router.push({path:'userlist'})
                 }
             }
            )
            .catch(err=>{
                console.log(err);
            })
        }
    },
    computed:{...mapState(['role'])}
    

}
</script>

<style>
</style>