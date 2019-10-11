import React from "react"

export class ToDoForm extends React.Component {
    constructor() {
        super()
        this.state = {
            todo: "",
            urgent: false
        }
    }

    render  = () => {
        const {addItem, nextKey} = this.props
        const {todo, urgent} = this.state
        const handleAddClick = event => {
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

        const updateTodo = event => {
            const todo = event.currentTarget.value
            this.setState({
                todo
            })
        }

        const toggleUrgent = () => {
            this.setState({
                urgent: !urgent
            })
        }
        return (
            <form>
              <input name="todo" value={todo} placeholder="Enter task" onChange={updateTodo}/>
              <input type="checkbox" name="urgent" check={urgent} onChange={toggleUrgent}/> Is it urgent?
              <input type="button" onClick={handleAddClick} value="Add" />
            </form>
        )
    }
}