<template>
  <div class="container">
  <div class="accout">
          <label for="name">{{accountname}}</label>
          <button class="btn btn-primary logout" @click="logout">Logout</button>
      </div> 
    <div class="form-group">
      <label for="usr">Full Name (<font color="red">*</font>):</label>
      <input
        required="true"
        type="text"
        class="form-control"
        id="fullname"
        name="fullname"
        v-model="item.fullname"
      />
    </div>

    <div class="form-group">
      <label for="usr">User Name (<font color="red">*</font>):</label>
      <input
        required="true"
        type="text"
        class="form-control"
        id="username"
        name="username"
        v-model="item.username"
      />
    </div>
    <div class="form-group">
      <label for="email">Email (<font color="red">*</font>):</label>
      <input
        required="true"
        type="email"
        class="form-control"
        id="email"
        name="email"
        v-model="item.email"
      />
    </div>
    <div class="form-group">
      <label for="pwd">Password (<font color="red">*</font>):</label>
      <input
        required="true"
        type="password"
        class="form-control"
        id="pwd"
        name="password"
        v-model="item.password"
      />
    </div>
    <div class="form-group">
      <label for="confirmation_pwd"
        >Confirmation Password (<font color="red">*</font>):</label
      >
      <input
        required="true"
        type="password"
        class="form-control"
        id="confirmation_pwd"
        name="confirmation_pwd"
        v-model="item.password"
      />
    </div>
    <div class="form-group">
      <label for="address">Address:</label>
      <input
        type="text"
        class="form-control"
        id="address"
        name="address"
        v-model="item.address"
      />
      <td>
        <button
          class="btn btn-success"
          @click="Update"
          >Update</button
        >
      </td>
    </div>
  </div>
</template>

<script>
import router from "../router"
import axios from "axios";
export default {
  data() {
    return {
      accountname:'',
      id: "",
      item: "",
    };
  },
  created() {
    if (
      localStorage.getItem("role") == "admin" ||
      localStorage.getItem("id") == this.$route.params.id
    )
      this.EditUser();
      else{
        alert("You don't have permission to edit")
        this.$router.p
      }
    // else alert
  },
  methods: {
     logout: function(){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      this.$router.push({path:'login'}) 
    },
    async EditUser() {
      this.id = this.$route.params.id;

      try {
        const response = await axios.post(
          "http://localhost/WebQLNS/server/api/authen.php?id=" + this.id,
          {
            action: "edit",
            id: this.id,
          }
        );
        this.item = response.data.result;
        this.item.password = "";
        console.log(this.item);
      } catch (err) {
        console.log(err);
      }
    },
    Update: function () {
       axios.post(
          "http://localhost/WebQLNS/server/api/authen.php",
          {
            "action": "update",
            "id": this.id,
            "username": this.item.username,
            "fullname": this.item.fullname,
            "email": this.item.email,
            "password": this.item.password,
            "address": this.item.address
          }
        ).then(
           function(response){
           if (response.status == 1) {
          router.go("userlist")
        }
           }
        ).catch(err=>{
          console.log(err);
        })
        
      } 
  }
}
    
</script>

<style>
</style>
