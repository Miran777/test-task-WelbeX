<template>
    <div>
        <my-dialog v-model:show="dialogVisible">
            <BlogForm @create="createBlog" />
        </my-dialog>
        <my-button
            @click="showDialog"
            >
            Создать пост
        </my-button>
        <BlogList 
            :blogs="blogs"
            @remove="removeBlog"
            @update="updatingBlog"
            v-if="!isBlogLoading"
        />
        <div v-else>Идет загрузка</div>
        <div class="page__wrapper">
            <div @click="swapPage" :class="{'current-page' : pageNumber === page}" class="page" v-for="pageNumber in totalPages" :key="pageNumber" >{{ pageNumber }}</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions,  } from "vuex";
import BlogList from "@/components/BlogList.vue";
import BlogForm from "@/components/BlogForm.vue";
import router from "@/router/router";

    export default {
        components: { BlogList, BlogForm},
        data() {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'blog/setPage',
            }),
            ...mapActions({
                swapPage: 'blog/swapPage',
                fetchBlogs: 'blog/fetchBlogs',
                deleteBlog: 'blog/deleteBlog',
                createNewBlog: 'blog/createNewBlog',
            }),

            createBlog(blog) {
                const d = new Date()
                const newDate = d.getDate() + '-' + (d.getMonth()+1) + '-' + d.getFullYear() + ' ' + d.getHours() + ":" + d.getMinutes()
                const body = {
                    username: this.username,
                    content: blog,
                    date: newDate,
                }
                console.log(body.username)
                this.createNewBlog(body)
                this.dialogVisible = false
            },
            
            removeBlog(blog) {
                if (this.username == blog.username) {
                    this.deleteBlog(blog)
                }
                else {
                    alert('Вы не можете удалить данное сообщение, так как Вы не являетесь автором')
                }
            },

            showDialog() {
                this.dialogVisible = true
            },
            
        },
        mounted() {
            if (this.token) {
                this.fetchBlogs()
            }
            else {
                router.push('/registration')
                alert('Необходимо авторизоваться чтобы получить доступ к блогам')
            }
        },
        computed: {
            ...mapState({
                blogs: state => state.blog.blogs,
                totalPages: state => state.blog.totalPages,
                page: state => state.blog.page,
                limit: state => state.blog.limit,
                isBlogLoading: state => state.blog.isBlogLoading,
                token: state => state.blog.token,
                auth: state => state.blog.auth,
                username: state => state.blog.username
            }),
        }
    }

</script>



<style scoped>

.page__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.page {
    cursor: pointer;
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

</style>