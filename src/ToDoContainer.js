import React from "react"
import {ToDo} from "./ToDo";
import {ToDoForm} from "./ToDoForm";

export class ToDoContainer extends React.Component {
    constructor () {
        super()
        this.state = {
            "key": 3,
            "items": [
                {
                    "key": 0,
                    "name": "Pick up milk",
                    "urgent": false,
                    "done": false
                },
                {
                    "key": 1,
                    "name": "Learn React",
                    "urgent": true,
                    "done": true
                },
                {
                    "key": 2,
                    "name": "Move to use redux and saga",
                    "urgent": true,
                    "done": false
                },
            ]
        }
    }

    render = () => {
        const nextKey = this.state.key
        const items = this.state.items
        const addItem = newItem => {
            const currentItems = [...items]
            currentItems.push(newItem)
            this.setState({
                items: currentItems,
                key: newItem.key + 1
            })
        }

        const toggleDone = key => () => {
            const currentItems = [...items]
            let target = currentItems.filter(c => c.key === key)[0]
            target.done = !target.done
            this.setState({
                items: currentItems
            })
        }

        return (
            <div id = "todo-container" >
            {items.map(item => < ToDo { ...item} onClick={toggleDone(item.key)} />)}
            <div id = "todo-form" >
                <ToDoForm addItem={addItem} nextKey={nextKey} />
            </div>
            </div>
        )
    }
}