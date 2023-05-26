<template>
    <Auth  :props="this.props" /> 
</template>
  
  <script>
  import Auth from '@/components/Auth'
  
  export default {
    data() {
        return {
            props: {
                name: 'Registration',
                btn: 'sign up',
                alt: 'sign in',
                path: 'login',
            }
        }
    },
    components: {Auth}
  }
  </script>
