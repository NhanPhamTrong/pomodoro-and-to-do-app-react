import "./TaskSection.scss"
import { Header } from "../../components/Header/Header"
import { Task } from "../../components/Task/Task"
import { useState } from "react"

export const TaskSection = (props) => {
    const [sort, setSort] = useState("none")

    const DeleteTask = (id) => {
        props.task.map((task) => {
            if (task.id === id) {
                task.id = -1
            }
            return task
        })
        props.DeleteTask()
    }

    const CompletedTask = (id) => {
        props.task.map((task) => {
            if (task.id === id) {
                task.isCompleted = task.isCompleted ? false : true
            }
            return task
        })
        props.CompletedTask()
    }

    const GetCompleted = () => {
        props.GetCompleted()
    }

    const GetActive = () => {
        props.GetActive()
    }

    const GetAll = () => {
        props.GetAll()
    }

    const ClickSort = () => {
        if (sort === "down") {
            setSort("up")
            props.SortUp()
        }
        else if (sort === "up") {
            setSort("none")
            props.Unsorted()
        }
        else {
            setSort("down")
            props.SortDown()
        }
    }

    const OpenAddTaskSection = () => {
        props.OpenAddTaskSection()
    }

    return (
        <>
            <div className="task-section">
                <Header />
                <div className="task-list">
                    <h1>All tasks</h1>
                    <ul>
                        {props.task.map((task, index) => {
                            return <Task
                                        key={index}
                                        id={task.id}
                                        name={task.name}
                                        description={task.description}
                                        priority={task.priority}
                                        isShown={task.isShown}
                                        isCompleted={task.isCompleted}
                                        DeleteTask={DeleteTask}
                                        CompletedTask={CompletedTask} />
                        })}
                    </ul>
                    <div className="statistic">
                        <button className={props.statistic[0] ? "active" : ""} type="button" onClick={GetAll}>All</button>
                        <button className={props.statistic[1] ? "active" : ""} type="button" onClick={GetActive}>Active</button>
                        <button className={props.statistic[2] ? "active" : ""} type="button" onClick={GetCompleted}>Completed</button>
                        <hr />
                        <button className="sort" type="button" onClick={ClickSort}>
                            <ion-icon name={sort === "up" ? "caret-up" : (sort === "down" ? "caret-down" : "ellipse")}></ion-icon>
                        </button>
                    </div>
                </div>
                <button className="add-task" type="button" onClick={OpenAddTaskSection}>+ Add new task</button>
            </div>
        </>
    )
}