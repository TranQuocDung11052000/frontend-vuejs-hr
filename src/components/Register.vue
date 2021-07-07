<template>
  <div class="container">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h2 class="text-center">Create New Account</h2>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="usr">Full Name (<font color="red">*</font>):</label>
          <input
            required="true"
            type="text"
            class="form-control"
            id="fullname"
            name="fullname"
            v-model="fullname"
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
            v-model="username"
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
            v-model="email"
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
            v-model="password"
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
            v-model="cfpassword"
          />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" class="form-control" id="address" name="address" />
        </div>

        <button type="submit" @click="Register()" class="btn btn-success">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      username: "",
      fullname: "",
      email: "",
      password: "",
      cfpassword: "",
      address: "",
    };
  },

  methods: {
    Register: function () {
      axios
        .post("http://localhost/WebQLNS/server/api/authen.php?", {
          action: "register",
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          address: this.address,
        })
        .then(function (response) {
          if (response.data.status == 1) {
            alert("Create accout success!!!");
            router.push({ path: "login" });
          }
        });
    },
  },
};
</script>

<style>
</style>