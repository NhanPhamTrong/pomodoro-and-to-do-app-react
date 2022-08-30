import "./AddTaskSection.scss"
import { useState } from "react"

export const AddTaskSection = (props) => {    
    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [error, setError] = useState({
        taskName: false,
        priority: false
    })

    const HandleChangeName = (e) => {
        setInputName(e.target.value)
    }

    const HandleChangeDescription = (e) => {
        setInputDescription(e.target.value)
    }

    const HandleSubmit = (e) => {
        document.querySelectorAll(".add-task-section li button").forEach((item) => {
            item.classList.remove("active")
        })

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            name: inputName,
            description: inputDescription,
            priority: priority,
            isShown: true
        })

        if (inputName.trim().length !== 0 && priority !== "") {
            setInputName("")
            setInputDescription("")
        }

        setError({
            taskName: inputName.trim().length !== 0 ? false : true,
            priority: priority !== "" ? false : true
        })
        setPriority("")
    }

    const ReturnTaskSection = () => {
        props.ReturnTaskSection()
    }

    const ChooseLevel = (e) => {
        document.querySelectorAll(".add-task-section li button").forEach((item) => {
            item.classList.remove("active")
        })
        e.target.classList.add("active")
        setPriority(e.target.getAttribute("name"))
    }

    return (
        <div className="add-task-section">
            <button className="return" onClick={ReturnTaskSection}><ion-icon name="arrow-back-outline"></ion-icon></button>
            <h1>New task</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <p className={"is-error " + (error.taskName ? "error" : "")}>Task name is empty</p>
                <input className={error.taskName ? "error" : ""} id="name" type="text" placeholder="Task name" value={inputName} onChange={HandleChangeName} />
                <input id="description" type="text" placeholder="Description (optional)" value={inputDescription} onChange={HandleChangeDescription} />
                <h2>Task priority</h2>
                <p className={"is-error " + (error.priority ? "error" : "")}>Priority is empty</p>
                <ul className={error.priority ? "error" : ""}>
                    <li>
                        <button type="button" name="High" onClick={ChooseLevel}>High</button>
                    </li>
                    <li>
                        <button type="button" name="Medium" onClick={ChooseLevel}>Medium</button>
                    </li>
                    <li>
                        <button type="button" name="Low" onClick={ChooseLevel}>Low</button>
                    </li>
                </ul>
                <button className="submit" type="button" onClick={HandleSubmit}>Submit</button>
            </form>          
        </div>
    )
}