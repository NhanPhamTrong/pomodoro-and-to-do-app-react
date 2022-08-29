import "./Task.scss"

export const Task = (props) => {
    const DeleteTask = () => {
        props.DeleteTask(props.id)
    }

    const CompletedTask = (e) => {
        props.CompletedTask(props.id)
    }

    const OpenDescription = (e) => {
        const element = e.target.closest(".content").classList
        if (element.contains("active")) {
            element.remove("active")
        }
        else {
            element.add("active")
        }
    }

    return (
        <li className={(props.isCompleted ? "completed " : "") + (props.isShown ? "" : "hide ") + props.priority}>
            <button className="checkbox" type="button" onClick={CompletedTask} title="Completed task">
                <ion-icon name="checkmark-outline"></ion-icon>
            </button>
            <div className="content">
                <button type="button" onClick={OpenDescription}>{props.name}</button>
                <p>{props.description}</p>
            </div>
            <button className="delete" type="button" onClick={DeleteTask}>
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </li>
    )
}