import { Container } from 'unstated'

const defaultState = {
  list: [[
    {
      id: 1,
      completed: false,
      text: 'Read README'
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests'
    }
  ]]
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList () {
    return this.state.list
  }

  toggleComplete = async (id, listNumber) => {
    const item = this.state.list[listNumber].find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map((singleList, index) => {
        if(listNumber == index ){
          return singleList.map(item => {
            if (item.id !== id) return item
            return {
              ...item,
              completed
            }
          })
        } else{
           return singleList
        }
      })
      return { list }
    })

    this.syncStorage()
  }

  createTodo = async (text, listNumber) => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list[listNumber].length + 1
      }
      const list = state.list.map((l, index) => {
          return listNumber == index ? l.concat(item) : l
      })    
      return  {list}
    })

    this.syncStorage()
  }


  createList = async text => {
    console.log(text, 'text');
  }

}


export default TodosContainer
