<template>
  <div class="home">
    <h1> all topics</h1>
    <div v-for="dt in dataHome" :key="dt.id">
      <b-jumbotron @click="goToPost(dt)" v-bind:header="dt.posts_blog_title">
        <p>{{dt.posts_blog_date}}</p>
        <p>{{dt.user_email}}</p>
      </b-jumbotron>
    </div>
    <router-link to="/create-post" v-if="dataLgn != null">add new post</router-link>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  props: {
  },
  data(){
      return {  
        dataHome: '',
        dataLgn: JSON.parse(localStorage.getItem('loginData')) || '',
      }
  },
  created(){
    this.loadDataHome()
  },
  methods: {
    async loadDataHome(){
      this.dataHome = await fetch(`${this.$store.getters.getBaseUrl}/blog/all-posts/`).then(Response => Response.json());
    },
    goToPost(dt){
      var id_post = dt.posts_blog_id
      this.$router.push({name: 'SinglePost', params: {id: id_post}});
    },

  },
}
</script>
