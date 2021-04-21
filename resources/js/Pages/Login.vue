<template>
    <div class="container">
        <div class="login">
            <h1>Вход</h1>
            <button @click="AuthProvider('google')">auth Google</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data(){
          return {
          }
      },
    methods: {
        AuthProvider(provider) {
            var self = this
            this.$auth.authenticate(provider).then(response =>{
                self.SocialLogin(provider,response)
            }).catch(err => {
                console.log({err:err})
            })
        },
        SocialLogin(provider,response){
            this.$http.post('api/sociallogin/'+provider,response).then(response => {
            }).catch(err => {
                console.log({err:err})
            })
        }
    }
}
</script>


