<template>
  <!-- Template Blogs-->
  <v-container class="ma-0-pa-0" grid-list-sm>
    <div class="text right">
      <v-btn small text to="/blogs" class="blue-text">
        All Blogs <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <v-layout wrap>
      <blog-item-component 
        v-for="blog in blogs" 
        :key="`blog-` + blog.id" 
        :blog="blog"
        ></blog-item-component>
        <!-- :blog itu untuk mengirim data binding ke BlogItemComponent.vuenya -->
    </v-layout>  

  <button @click="increment(10)">Tambah</button>
  {{ count }}
    
  </v-container>

</template>

<script>
import BlogItemComponent from '../components/BlogItemComponent.vue';
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    apiDomain: 'https://demo-api-vue.sanbercloud.com',
    blogs: [],
  }),
  
  components : {
    'blog-item-component' : BlogItemComponent
  },

  computed: {
    //count(){
      //return this.$store.getters.count
    //}

    ...mapGetters({
    'count' : 'counter/count' //count yang pertama buat di html diatas, jadi kl count yang pertama diganti tambah di html atas juga tambah
    })
  },

  methods: {
    go(){  
      const config = {
        method: 'get',
        url: this.apiDomain + '/api/v2/blog/random/4' // ambil data nya sebanyak 4 data
      } 
    
      this.axios(config)
        .then(response => {
          let { blogs } = response.data;
          this.blogs = blogs;
        })
        .catch(error => {
          console.log(error);
        });
          /* const api = 'http://demo-api-vue.sanbercloud.com/api/v2/blog/random/3'
            this.axios.get(api).then((response) => { console.log(response.data) }) */
      },

    //increment (payload) {
      //this.$store.commit('increment' , payload)
    //}
    ...mapMutations({
      'increment' : 'counter/increment' //karena sudah pake module di index.js (store) maka panggil si counternya dulu
    })
  
  },

  created() {
      this.go()
    }
};  
</script>
