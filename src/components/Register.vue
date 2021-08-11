<template>
    <v-card>
    <Alert></Alert>
     <v-toolbar dark color="black">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-container fluid>
            <v-form ref="form">
                <v-text-field
                v-model="name"
                label="Name"
                required
                append-icon="mdi-account">
                </v-text-field>

                <v-text-field
                v-model="email"
                label="E-mail"
                required
                append-icon="mdi-email">
                </v-text-field>

                <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword? 'text' : 'password'"
                label="Password"
                counter
                @click:append="showPassword = !showPassword">
                </v-text-field>

                <v-file-input
                    accept="image/*"
                    label="File input"
                    name="photo"
                    ref="photo"
                    v-model="photo"
                ></v-file-input>

                <div class="text-xs-center">
                    <v-btn
                    color="success"
                    @click="submit"
                    >
                    Register <v-icon right dark>mdi-lock-open</v-icon>
                    </v-btn>
                </div>

            </v-form>
    </v-container>

    </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from './Alert.vue';


    export default {
        components:{Alert},
        data () {
            return {
                email: '',
                showPassword: false,
                password: '',
                apiDomain : 'https://demo-api-vue.sanbercloud.com',
                name : '',
                photo : []
            }
        },
        methods : {
            close(){
                this.$emit('closed',false)
            },
            submit(){
                // let file = this.$refs.photo.files[0]
                let formData = new FormData()

                formData.append('name',this.name)
                formData.append('email',this.email)
                formData.append('password',this.password)
                formData.append('photo_profile',this.photo)

                const config = {
                    method : 'post',
                    url : `${this.apiDomain}/api/v2/auth/register`,
                    data : formData
                }

                this.axios(config)
                .then(response => {
                    console.log(response.data.message)
                    this.setAlert({
                        status : true,
                        color : 'success',
                        text : 'Register berhasil! Silahkan lakukan Login'
                    })

                    this.close()
                })
                .catch(error => {
                    console.log(error);
                    this.setAlert({
                        status : true,
                        color : 'red',
                        text : 'Register gagal'
                    })
            })
            },
            ...mapActions({
            setAlert : 'alert/set'
        })
        }
    }

</script>
