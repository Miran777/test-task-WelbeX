<template>
    <div class="navbar" >
        <div @click="$router.push('/')" style="cursor: pointer; color: red; font-weight: 800; font-size: 2rem;" >Home</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/blogs')">Блоги</my-button>
            <my-button v-if="!auth" @click="$router.push('/registration')" style="margin-left: 20px;" >sign up</my-button>
            <my-button v-if="!auth" @click="$router.push('/login')">sign in</my-button>
            <my-button v-else @click="authLogout">sign out</my-button>
        </div>
    </div>
</template>

<script>
import router from "@/router/router";
import { mapState, mapActions, mapMutations } from "vuex"
    export default {
        methods: {
        ...mapActions({
            logout: 'blog/logout'
        }),
        authLogout() {
            this.logout()
            router.push('/')
        }
        },
        computed: {
            ...mapState({
                auth: state => state.blog.auth
            })
        }
    }
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}
</style>