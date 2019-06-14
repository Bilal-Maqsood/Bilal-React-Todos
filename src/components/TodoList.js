import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'


class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filter: 'all',
      filteredItems: []
    }

  }

  componentDidMount(){
    this.setState({
      filteredItems: this.props.items
    })
  }

  handleChange = (e) => {
    this.setState({
      filter: e.target.value
    },()=>{
      this.getFilteredItems()
    })
  }

  getFilteredItems = () => {
    const filterData = this.props.items.filter((item)=>{
        if(this.state.filter == 'all'){
          return true;
        } else if(this.state.filter == 'completed'){
          return item.completed === true;
        } else {
          return item.completed === false;           
        }
    })
    this.setState({
      filteredItems: filterData
    })
  }

  render(){
    console.log(this.state.filteredData , 'it');
    const {toggleComplete, index, name} = this.props;
    const {filteredItems} = this.state;
    return(
      <Wrapper>
      <div>{name}</div>
      <label>
            Filter by:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </label>
   
      {filteredItems.map(item => {
        const onComplete = e => {
          toggleComplete(item.id, index )
        }
  
        return <TodoItem key={item.id} {...item} onComplete={onComplete} />
      })}
    </Wrapper>

    )
  }

}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
