import "./AddTaskSection.scss"
import { useState } from "react"

export const AddTaskSection = (props) => {    
    const [inputName, setInputName] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [priority, setPriority] = useState("")

    const HandleChangeName = (e) => {
        setInputName(e.target.value)
    }

    const HandleChangeDescription = (e) => {
        setInputDescription(e.target.value)
    }

    const HandleSubmit = (e) => {
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            name: inputName,
            description: inputDescription,
            priority: priority,
            isShown: true
        })

        setInputName("")
        setInputDescription("")
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
                <input id="name" type="text" placeholder="Task name" value={inputName} onChange={HandleChangeName} />
                <input id="description" type="text" placeholder="Description (optional)" value={inputDescription} onChange={HandleChangeDescription} />
                <button type="button" onClick={HandleSubmit}>Submit</button>
                <span>Warning / Error</span>
            </form>
            <h2>Task priority</h2>
            <ul>
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
        </div>
    )
}