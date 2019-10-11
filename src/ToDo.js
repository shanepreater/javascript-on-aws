import React from "react"

export const ToDo = ({id, name, done, urgent, onClick}) => {
    let classNames = done ? "todo-complete" : "todo-open"
    if(urgent) {
        classNames += " todo-urgent"
    }
    return (
        <div className={classNames} onClick={onClick}>
            <input type="checkbox" name={id} checked={done}/> {name}
        </div>
    )
}