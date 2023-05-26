<template>
    <div v-if="blogs.length > 0" >
        <h3 class="ta-center">Список блогов</h3>
        <transition-group name="blog-list" >
            <BlogItem 
                :key="blog._id" 
                :blog="blog" 
                v-for="blog in blogs"
                @update="$emit('update', blog)"
                @remove="$emit('remove', blog)"
            />
        </transition-group>
    </div>
    <h2 class="ta-center" v-else style="color: red;">
        Список блогов пуст
    </h2>
</template>

<script>
    import BlogItem from "@/components/BlogItem.vue"
    import router from "@/router/router";
    import { mapActions } from "vuex";
        export default {

            components: {
                BlogItem
            },
            props: {
                blogs: {
                    type: Array,
                    required: true,
                }
            }
    }
</script>

<style scoped>
.blog-list-enter-active,
.blog-list-leave-active {
  transition: all 0.4s ease;
}
.blog-list-enter-from,
.blog-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.blog-list-move {
    transition: all 0.4s ease;
}
.ta-center {
    text-align: center;
}
</style>