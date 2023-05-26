<template>
    <div>
        <h1 style="color: white">Страница поста с ID: {{ $route.params.id }}</h1>
        <div class="blog">
            <div>
                <my-input v-if="this.username == oneBlog.username" v-model="message" aria-placeholder="Сообщение"></my-input>
                <h4 style="margin-bottom: 30px; color: red;" v-else>Вы не можете удалить или отредактировать этот пост, т.к. Вы не являетесь его автором</h4>
                <div><strong>Автор:</strong>{{ oneBlog.username }}</div>
                <div><strong>Сообщение: </strong>{{ oneBlog.content }}</div>
                <div><strong>Дата выпуска: </strong>{{ oneBlog.date }}</div>
                <my-button
                v-if="this.username == oneBlog.username"
                @click="updatingBlog(oneBlog)"
                >
                Редактировать
            </my-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

    export default {
        data() {
            return {
                message: '',
            }
        },
        computed: {
            ...mapState({
                oneBlog: state => state.blog.oneBlog,
                username: state => state.blog.username
            })
        },
        methods: {
            ...mapMutations({
                setOneBlog: 'blog/setOneBlog'
            }),
            ...mapActions({
                fetchOneBlog: 'blog/fetchOneBlog',
                updateBlog: 'blog/updateBlog'
            }),
            updatingBlog(blog) {
                    const updatedBlog = {
                        ...blog, content: this.message, _id: this.$route.params.id,
                    }
                    this.setOneBlog(updatedBlog)
                    this.updateBlog(updatedBlog)
            },
        },
        mounted() {
            this.fetchOneBlog(this.$route.params.id)
        }
    }
</script>

<style scoped>
.blog {
    background-color: white;
    margin-top: 15px;
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>