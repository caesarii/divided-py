const fetchTodo = function() {
  const r = {
    url: '/api/todo/all',
    type: 'get',
    success: function(data) {
      console.log('data', data)
    },
    error: function(err) {
      console.error(err)
    }
  }
  $.ajax(r)
}

const bindEventFetchTodo = function() {
  $('#id-button-todo-list').on('click', function() {
    fetchTodo()
  })
}

const bindEvent = function() {
  bindEventFetchTodo()
}

$(document).ready(function() {
  console.log('ready')
  bindEvent()
})