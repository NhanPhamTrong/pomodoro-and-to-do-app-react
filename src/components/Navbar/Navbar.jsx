import { useState } from "react"
import "./Navbar.scss"

export const Navbar = (props) => {
    const [isPomodoro, setIsPomodoro] = useState(true);

    const OpenPomodoro = () => {
        props.OpenPomodoro()

        setIsPomodoro(true)
    }

    const OpenTaskSection = () => {
        props.OpenTaskSection()

        setIsPomodoro(false)
    }

    return (
        <nav>
            <button className={isPomodoro ? "active" : ""} type="button" onClick={OpenPomodoro}><ion-icon name="timer-outline"></ion-icon></button>
            <button className={isPomodoro ? "" : "active"} type="button" onClick={OpenTaskSection}><ion-icon name="list-outline"></ion-icon></button>
        </nav>
    )
}