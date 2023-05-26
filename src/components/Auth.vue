<template>
  <div class="container">
    <form class="card" @submit.prevent="authLogin(props)">
      <h1 >{{ props.name }}</h1>
      <div class="form-control">
        <label>Username</label>
        <my-input required v-model="this.username" type="text" placeholder="Username"  @blur="() => usNameTouch= true" />
        <small v-if="this.username.length < 1 && this.usNameTouch" >username is not valid</small>
      </div>
      <div class="form-control">
        <label>Password</label>
        <my-input required v-model="this.password" type="password" placeholder="Password" @blur="() => passTouch= true" />
        <small v-if="this.password.length < 8 && this.passTouch" >password must be at least 8 characters. Now {{ this.password.length }}</small>
      </div>

      <button :disabled="this.password.length < 8 || this.username < 1" class="btn primary" type="submit">{{ props.btn }}</button>
      <small style="cursor: pointer;" @click="$router.push(`${props.path}`)">or {{ props.alt }}</small>
    </form>
  </div>
 </template>
  
<script>
  import { mapActions, mapMutations, mapState } from 'vuex'
  
  export default {
    data()  {
      return {
        usNameTouch: false,
        passTouch: false,
        username: '',
        password: '',
      }
    },
    props: {
        props: {
            type: Object
        }
    },
    methods: {
        ...mapMutations({
            setUsername: 'blog/setUsername',
            setPassword: 'blog/setPassword'
        }),
        ...mapActions({
            login: 'blog/login'
        }),
        authLogin(props) {
          const data = {
            username: this.username,
            password: this.password,
            path: props.name.replace(' ', '').toLowerCase()
          }
          this.login(data)
        }
    },
    computed: {
      ...mapState({
        username: state => state.blog.username,
      })
    },
  }
  </script>



<style scoped>
.container {
    padding: 20px;
    margin: 0 auto;
    max-width: 1000px;
    color: #2c3e50;
}
.form-control {
    position: relative;
    margin-bottom: 0.5rem;
}
.card {
    overflow: hidden;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
    background: #fff;
}
.form-control input,
.form-control select,
.form-control textarea{
    font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
    margin: 0;
    outline: none;
    border: 2px solid #ccc;
    display: block;
    width: 100%;
    color: #2c3e50;
    padding: 0.5rem 1.5rem;
    border-radius: 3px;
    font-size: 1rem;
    resize: none;
}
.btn {
    color: #42b983;
    position: relative;
    place-content: center;
    place-items: center;
    width: fit-content;
    border-radius: 99px;
    letter-spacing: 0.05em;
    border: 1px solid #42b983;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 10px;
    padding: 0.5rem 1.5rem;
    white-space: nowrap;
    font-weight: 700;
    outline: none;
    background: #fff;
    transition: all 0.22s;
}

.btn:hover {
    cursor: pointer;
    opacity: 0.8;
}

.btn.primary {
    background: #42b983;
    color: #fff;
}
.btn:disabled {
    cursor: not-allowed;
    opacity: 1!important;
    background: #eee!important;
    border-color: #ddd!important;
    color: #999!important;
}

.btn:active {
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.form-control small {
    color: #e53935;
}

.ta-center {
    text-align: center;
}
</style>