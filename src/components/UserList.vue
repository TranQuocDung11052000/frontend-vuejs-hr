<template>
  <div>
    <div class="panel-body">
      <div class="accout">
          <label for="name">{{accountname}}</label>
          <button class="btn btn-primary logout" @click="logout">Logout</button>
      </div>   
      <table class="table table-bordered">
        <thead class="thead-dank">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.fullname }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.address }}</td>
            <td class="has-text-centered">
              <button class="btn btn-warning" @click="CheckEdit(item.id)">Edit</button>
            </td>
            <td>
              <button class="btn btn-danger" @click="Delete(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
     
    </div>
  </div>
</template>
 
<script>
// import axios
import axios from "axios";
import router from '../router'

export default {
  name: "ProductList",
  data() {
    return {
      accountname:'',
      items: [],
      deletedone:false
    };
  },

  created() {
    this.getProducts();
  },
  
  methods: {
    CheckEdit:function(id){
      if (id==localStorage.getItem('id')|| localStorage.getItem('role')=='admin')
      {
        this.$router.push({path:"edit/"+id})
      }
      else alert("You don't have permission to edit")
    },
    Delete: function (id) {
      if (id!=localStorage.getItem('id')|| localStorage.getItem('role')!='admin'){
        alert("You don't have permission to delete")
        router.go();
      }
      else
    {
    var conf=confirm("Do you want delete account");
    if (conf){
      axios.post(
        "http://localhost/WebQLNS/server/api/authen.php?id="+id,
        {
          action: "delete",
        }
      ).then(
        function(response){
          if (response.data.status==1)
          {
            alert("Delete Accout success")
            router.go()
          }
          else {
            alert("Delete accout failed")
          }
        }
      )
      .catch(err=>{console.log(err);})
    
    }}
    return;
    },
     logout: function(){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      this.$router.push({path:'login'}) 
    },
    async getProducts() {
      try {
        const response = await axios.post(
          "http://localhost/WebQLNS/server/api/authen.php",
          {
            action: "list",
          }
        );
        this.items = response.data.userList;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style scoped>
.accout{
  margin-top:10px;
  margin-left:1200px;
}
.table{
  margin-top:50px;
}
</style>