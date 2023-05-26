import router from "@/router/router"
import axios from "axios"
import Cookies from 'js-cookie'

const csrftoken = Cookies.get('csrftoken')



export const blogModule = {
    state: () => ({
        username: '',
        auth: false,
        blogs: [],
        isBlogLoading: false,
        page: 1,
        limit: 20,
        totalPages: 0,
        token: 0,
        oneBlog: {
            username: '',
            content: '',
            date: ''
        }
    }),
    getters: {
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        setPassword(state, password) {
            state.password = password
        },
        setAuth(state, boolean) {
            state.auth = boolean
        },
        setPage(state, page) {
            state.page = page
        },
        setBlogs(state, blogs) {
            state.blogs = blogs
        },
        setLoading(state, boolean) {
            state.isBlogLoading = boolean
        },
        setToken(state, value) {
            state.token = value
            localStorage.setItem('token', state.token)
        },
        deleteToken(state) {
            state.token = ''
            localStorage.removeItem('token')
        },
        setTotalPages(state, value) {
            state.setTotalPages = value
        },
        setOneBlog(state, object) {
            state.oneBlog.username = object.username
            state.oneBlog.content = object.content
            state.oneBlog.date = object.date
        },
    },
    actions: {
        async login({commit}, data) {
            try {
                const response = await axios.post(`http://localhost:5000/${data.path}`, {
                    username: data.username,
                    password: data.password,
                })
                commit('setAuth', true)
                commit('setUsername', data.username)
                commit('setToken', response.data.token)
                router.push('/blogs')
            } catch (error) {
                console.log(error.message)
            }
        },
        async logout({commit}) {
            try {
                commit('setAuth', false)
                commit('deleteToken')
                commit('setUsername', '')
            } catch (error) {
                console.log(error)
            }
        },
        async fetchBlogs({state, commit}) {
            try {
                commit('setLoading', true)
                commit('setPage', 1)
                const response = await axios.get(`http://localhost:5000/blogs?`, {
                    headers: {
                        'Authorization': `Bearer ${state.token}`
                    },
                    params: {
                        page: state.page,
                        limit: state.limit,
                    },
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setBlogs', response.data)
            } catch (error) {
                console.log('Ошибка: ', error.message)
            } finally {
                commit('setLoading', false)
            }
        },
        async fetchOneBlog({state, commit}, id) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`http://localhost:5000/blogs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${state.token}`
                    },
                })
                commit('setOneBlog', response.data )
            } catch (error) {
                console.log('Ошибка: ', error.message)
            } finally {
                commit('setLoading', false)
            }
        },
        async createNewBlog({state, commit}, blog) {
            try {
                console.log(blog, state.token)
                const response = await fetch(`http://localhost:5000/blogs`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    method: 'POST',
                    body: JSON.stringify({...blog}),
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    },
                })
                const data = await response.json()
                commit('setBlogs', [...state.blogs, data])
            } catch (error) {
                console.log(error.message)
            }
        },
        async swapPage({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('http://localhost:5000/blogs', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    },
                    headers: {
                        'Authorization': `Bearer ${state.token}`
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setBlogs', [response.data])
            } catch (error) {
                console.log('Ошибка: ', error)
            } 
        },
        async deleteBlog({state, commit}, blog) {
            try {
                const response = await axios.delete('http://localhost:5000/blogs', {
                    data: blog,
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    },
                    headers: {
                        'Authorization': `Bearer ${state.token}`,
                    }
                }).then(
                    deletedBlog => {
                        commit('setBlogs', state.blogs.filter(blog => blog._id !== deletedBlog.data._id))
                    }
                )
            } catch (error) {
                console.log(error.message)
            }
        },
        async updateBlog({state, commit}, blog) {
            try {
                const response = await fetch(`http://localhost:5000/blogs`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    method: 'PUT',
                    body: JSON.stringify(blog),
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    },
                })
                const data = await response.json()
                commit('setBlogs', [state.blogs.map(
                    blog => blog._id !== data._id
                ), data])
            } catch (error) {
                console.log(error.message)
            }
        }
    },
    namespaced: true,
}