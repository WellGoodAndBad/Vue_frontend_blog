<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="title_post"
        label="Title post"
      >
        <b-form-input id="title_post" v-model="posts_blog_title" trim></b-form-input>
      </b-form-group>
      <b-form-group
        id="text_post"
        label="Text post"
      >
        <b-form-textarea
          id="text_post"
          v-model="posts_blog_text_blog"
          placeholder="Enter something..."
          rows="15"
          max-rows="30"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'CreatePost',
  components: {
    
  },
  props:[],
  data(){
      return {
        // id_post: this.$route.params.id,
        dataLgn: JSON.parse(localStorage.getItem('loginData')) || '',
        form_errors: [],
        posts_blog_title: '',
        posts_blog_text_blog: '',
        isUpdate: false,

      }
  },

  created(){
    this.updatePost(this.$route.params.id);
    },
  methods:{
    clearForm() {
                this.posts_blog_title = ''
                this.posts_blog_text_blog = ''
                this.form_errors = []
                },
    async updatePost(id_post){
      if (id_post != undefined){
        var url = `${this.$store.getters.getBaseUrl}/blog/${id_post}`;
        var dataPost = await fetch(url,{
          method: 'GET', 
          headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'bearer '+this.dataLgn.access_token
        },
        }).then(Response => Response.json()).catch(err => console.log(err));
          this.posts_blog_title = dataPost.posts_blog_title;
          this.posts_blog_text_blog = dataPost.posts_blog_text_blog;
          this.isUpdate = true;
      }
    },
    async createPost(url){
       fetch(url,{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:8080",
        'Authorization': 'bearer '+this.dataLgn.access_token
      },
      body: JSON.stringify({posts_blog_title: this.posts_blog_title,
                            posts_blog_text_blog: this.posts_blog_text_blog,})
      }).then(Response => Response.json()).catch(err => console.log(err));

    },

    sendPost() {
      var url = `${this.$store.getters.getBaseUrl}/blog/create-post`;
      if (this.isUpdate){
        url = `${this.$store.getters.getBaseUrl}/blog/update/${this.$route.params.id}`;
      }
      this.createPost(url);
      this.$router.push({name: "Home"});
      
    },

    onSubmit(event) {
      event.preventDefault()
      this.sendPost();

    },
  },
}
</script>