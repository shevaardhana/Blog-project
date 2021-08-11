<template>
  <div id="post-page">
    <div class="d-flex justify-space-between">
        <h2>Posts</h2>
        <v-btn elevation="4" to="/posts/create">
          <v-icon>
            mdi-plus
          </v-icon>
          Add Post
        </v-btn>
    </div>
    <v-data-table :headers="headers" :items="blogs" class="elevation-1">
      <template>
        <v-icon small class="mr-2">mdi-pencil</v-icon>
        <v-icon small>mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Post from '../../api/Post.js';

export default {
  name: 'Posts',
 
  created() {
    this.fetchBlogs();
  },

  data() {
    return {
      form: {
        title: '',
        description: '',
      },
      blogs: [],
      headers: [
        {text: 'Title', value: 'title', sortable: false},
        {text: 'Desc', value: 'description'}
      ],
    }
  },

  methods: {
    fetchBlogs () {
      Post.fetch()
        .then((response) => {
          this.blogs = response.data.blogs.data;
          //console.log(response);
        })
      
    },


  }
}
</script>

<style>

</style>
