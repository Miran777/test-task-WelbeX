<template>
    <div class="blog">
        <div>
            <div><strong>Автор:</strong>{{ blog.username }}</div>
            <div><strong>Сообщение: </strong>{{ blog.content }}</div>
            <div><strong>Дата выпуска: </strong>{{ blog.date }}</div>
        </div>
        <div class="blog__btns">
            <my-button
            @click="$router.push(`blogs/${blog._id}`)"
            >
            Открыть
            </my-button>
            <my-button
            @click="$emit('remove', blog)"
            >
            Удалить
            </my-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            blog: {
                type: Object,
                required: true
            }
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

.blog__btns {
    display: flex;
}
</style>