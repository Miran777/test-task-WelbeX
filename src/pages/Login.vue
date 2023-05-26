<template>
    <Auth :props="this.props" /> 
</template>
  
<script>
  import Auth from '@/components/Auth'

  export default {
    data() {
        return {
            props: {
                name: 'Log in',
                btn: 'sign in',
                alt: 'sign up',
                path: 'registration'
            }
        }
    },

    components: {Auth}
  }
  </script>
