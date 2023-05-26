<template>
    <div class="blog">
        <div>
            <div><strong>Автор:</strong>{{ blog.username }}</div>
            <div><strong>Сообщение: </strong>{{ blog.content }}</div>
            <div><strong>Дата выпуска: </strong>{{ blog.date }}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState({
                blog: 'blog/blog'
            })
        }
    }
</script>

<style scoped>

</style>