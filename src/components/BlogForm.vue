<template>
    <form @submit.prevent >
        <h4>Создание блога</h4>
        <my-input 
        v-model="this.blog"
        v-focus
        type="text" placeholder="Сообщение"
        />
        <my-button @click="createBlog" class="btn">Создать пост</my-button>
    </form>
</template>

<script>
import { mapState } from 'vuex'

    export default {
        data() {
            return {
                blog: ''
            }
        },
        methods: {
            createBlog() {
                this.$emit('create', this.blog)
            },
        },
    }
</script>

<style scoped>
form {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.btn {
    margin-top: 15px;
    align-self: flex-end;
}

</style>