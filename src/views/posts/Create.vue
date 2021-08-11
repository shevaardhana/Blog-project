<template>
  <div id="create-post-page">
    <h2>Create Post</h2>
    <form @submit.prevent="submitForm">
      <v-text-field label="Title" :rules="rules" v-model="form.title">
      </v-text-field>

      <v-textarea
        outlined
        label="Description"
        :rules="rules"
        v-model="form.description"
      >
      </v-textarea>
      <v-btn type="submit">Submit</v-btn>
    </form>
  </div>
</template>

<script>
import Post from '../../api/Post.js';

export default ({
    name: 'Create',
    data() {
        return{
            form: {
                title: '',
                description: '',
      },
      rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 Characters',

            ],
        }
    },


    methods: {
        submitForm(){
            Post.store()
               /*  let formData = new FormData() */
               /*  formData.append('title' , this.title)
                formData.append('description' , this.description) */
                   
                .then( (response) => { 
                    /* this.clearForm()
                    this.getMembers() */
                    alert(response.data.message)
                    console.log(this.submitForm)
                    })
                    .catch( (error) => {
                        console.log(error)
                    })


                    
                }  
        },
        /* submitForm() {
            Post.store(this.form)
                .then(() => {
                    alert('Post has been posted');
                })
        }, */

        /* postBlogs (){
      Post.post(this.form)
      .then(() => {
        alert('Post has been posted');
      })
    } */
    
})
</script>
