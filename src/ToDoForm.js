import React from "react"

export class ToDoForm extends React.Component {
    constructor() {
        super()
        this.state = {
            todo: "",
            urgent: false
        }
    }

    handleAddClick = event => {
        const {addItem, nextKey} = this.props
        const {todo, urgent} = this.state

        addItem({
            key: nextKey,
            name: todo,
            urgent,
            done: false
        })
        this.setState({
            todo: "",
            urgent: false
        })
    }

    updateTodo = event => {
        const todo = event.currentTarget.value
        this.setState({
            todo
        })
    }

    toggleUrgent = () => {
        const urgent = this.state.urgent
        this.setState({
            urgent: !urgent
        })
    }

    render  = () => {
        const {todo, urgent} = this.state

        return (
            <form>
              <input name="todo" value={todo} placeholder="Enter task" onChange={this.updateTodo}/>
              <input type="checkbox" name="urgent" check={urgent} onChange={this.toggleUrgent}/> Is it urgent?
              <input type="button" onClick={this.handleAddClick} value="Add" />
            </form>
        )
    }
}