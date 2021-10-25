var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
        todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
    },
    save: function(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = Vue.createApp({
    data: () => ({
      isEditing: false,
      newItem: '',
      todos: todoStorage.fetch(),
    }),
    watch: {
      todos: {
          handler: function(todos) {
              todoStorage.save(todos)
          },
          deep: true
      }
    },
    methods: {
        addTodo: function (event) {
            if(this.newItem === '') return
            var todo = {
                item: this.newItem,
                id: todoStorage.uid++,
                isDone: false
            }
            this.todos.push(todo)
            this.newItem = ''
          },
          deleteTodo: function(index) {
            this.todos.splice(index, 1)
          },
          editTodo: function(index) {
            this.isEditing = true
            this.newItem = this.todos[index].item
            this.selectedIndex = index
          },
          updateTodo: function (event) {
            var todo = {
                item: this.newItem,
                id: this.selectedIndex,
                isDone: false
            }
            this.todos.splice(this.todos[this.selectedIndex].id, 1, todo)
            this.newItem = ''
            this.isEditing = false
          }
    }
    })
app.mount('#app')
