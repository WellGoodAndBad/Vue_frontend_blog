<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
     
      <b-card bg-variant="light">
        <b-form @submit="onSubmit">
          <b-form-group
            label-cols-lg="3"
            label="Sigh In"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="Email"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input 
              id="email"
              v-model="email"
              placeholder="Enter email"
              required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Password"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input 
              id="password" 
              type="password"
              v-model="password"
              placeholder="Enter password"
              required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
          
          </b-form-group>
        </b-form>
    </b-card>
      <div v-show="form_errors.length > 0">
        <div v-for="err in form_errors" v-bind:key="err">
          <p>{{err}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'CreateAccount',
  components: {
    
  },
  props:{

  },
  data(){
      return {
        form_errors: [],
        email: '',
        password: '',

      }
  },

  created(){

    },
  methods:{
    clearForm() {
                this.email = ''
                this.password = ''
                this.form_errors = []
                },

    async sighIn(url){
       var auth_data = await fetch(url,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*"
            },
            body: `grant_type=&username=${this.email}&password=${this.password}&scope=&client_id=&client_secret=`
        }).then(Response => Response.json()).catch(err => console.log(err));
        auth_data["email"] = this.email
        localStorage.setItem('loginData', JSON.stringify(auth_data));
    },

    onSubmit(event) {
      event.preventDefault()
      this.sighIn(`${this.$store.getters.getBaseUrl}/auth/jwt/login`);
      this.$router.push({name: "Home"});

    },
  },
}
</script>