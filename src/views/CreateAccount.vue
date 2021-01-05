<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
     
      <b-card bg-variant="light">
        <b-form @submit="onSubmit">
          <b-form-group
            label-cols-lg="3"
            label="Creating account"
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

            <b-form-group
              label="Repeated password"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input 
              id="repeated-password" 
              type="password"
              v-model="repeatedPassword"
              placeholder="Repeat password"
              required
              ref="repeatedPasswordEl"
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
        repeatedPassword: '',

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

    async createAccount(url){
       fetch(url,{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({email: this.email,
                            password: this.password,})
      }).then(Response => Response.json()).catch(err => console.log(err));

    },

    checkPasswordsEqualityAndCreate() {
      if (this.password !== this.repeatedPassword) {
        this.form_errors.push('enter same password');
      } else{
        this.createAccount(`${this.$store.getters.getBaseUrl}/auth/register/`);
        this.$router.push({name: "Home"});
      }
    },

    onSubmit(event) {
      event.preventDefault()
      this.checkPasswordsEqualityAndCreate();

    },
  },
}
</script>