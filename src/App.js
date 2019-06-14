import React, {Fragment } from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            console.log(todos, 'todos');
            const lists = todos.getList()
            return (
              <TodosWrapper>
                <AddTodo placeholder='Add new list...' onAdd={todos.createList} />
                { lists.map((list, index) =>{
                  return(
                   <Fragment key={index}>
                      <AddTodo index={index} placeholder='Add new todo...' onAdd={todos.createTodo} />
                      <TodoList index={index} name={list.name} items={list.todos} toggleComplete={todos.toggleComplete} />
                   </Fragment>
                  )
                })
                }
             
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
