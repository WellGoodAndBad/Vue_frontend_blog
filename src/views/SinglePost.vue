<template>
  <div>
    <b-jumbotron >
      <h2>{{posts_blog_title}}</h2>
      <p>{{posts_blog_text_blog}}</p>
      <p>{{owner}}</p>
      <p>{{posts_blog_date}}</p>
      <a href="" @click="deletePost" class="card-link">delete post</a>
      <a href="" @click="updatePost" class="card-link">update post</a>
    </b-jumbotron>
    <div v-if="page_errors.length > 0">
      <h5>errors on page</h5>
      <div v-for="err in page_errors" v-bind:key="err">
        <p>{{err}}</p>
      </div>
    </div>
  </div>

</template>


<script>

export default {
  name: 'SinglePost',
  components: {
    
  },
  props:['id'],
  data(){
      return {
        dataLgn: JSON.parse(localStorage.getItem('loginData')) || '',
        page_errors: [],
        posts_blog_title: '',
        posts_blog_text_blog: '',
        posts_blog_date: '',
        owner: '',
      }
  },

  created(){
      this.getPost();
    },
  methods:{
    async getPost(){
      var url = `${this.$store.getters.getBaseUrl}/blog/${this.id}`;
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
        this.posts_blog_date = dataPost.posts_blog_date;
        this.owner = dataPost.user_email;
    },
    async deletePost(){
      event.preventDefault()
      var url = `${this.$store.getters.getBaseUrl}/blog/delete/${this.id}`;
      var response = await fetch(url,{
        method: 'GET', 
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': 'bearer '+this.dataLgn.access_token
      },
      }).then(Response => Response.json()).catch(err => console.log(err));
      if (response.status_code === 200){
        this.$router.push({name: "Home"});
      }else{
        this.page_errors.push(response.detail);
      }

    },
    async updatePost(){
      event.preventDefault();
      this.$router.push({name: 'UpadatePost', params: {id: this.id}});
    }
  },
}
</script>