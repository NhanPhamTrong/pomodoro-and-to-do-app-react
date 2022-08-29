import "./Pomodoro.scss"
import { Header } from "../../components/Header/Header"
import { useState } from "react"
import { useInterval } from 'usehooks-ts'

export const Pomodoro = () => {
    const [fill, setFill] = useState({
        strokeDashoffset: 911,
        stroke: "rgb(0, 0, 0)",
        timer: "25:00"
    })

    const t1 = 1500
    const t2 = 300
    const t3 = 900

    const [temp1, setTemp1] = useState(0)
    const [temp2, setTemp2] = useState(0)
    const [temp3, setTemp3] = useState(0)
    const [isFocus, setIsFocus] = useState(true)
    
    const [isPlaying, setIsPlaying] = useState(false)

    const [countSession, setCountSession] = useState(0)

    const [activeSession, setActiveSession] = useState(["", "", "", ""])

    const timerCount = () => {
        if (isFocus) {
            setTemp2(0)

            if (countSession === 4) {
                if (temp3 <= t3) {
                    let m = Math.floor((t3 - temp3) / 60)
                    let s = (t3 - temp3) % 60
    
                    setFill({
                        strokeDashoffset: 911 - 911 * temp3 / t3,
                        stroke: "rgb(255, 207, 92)",
                        timer: (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
                    })
    
                    setTemp3(temp3 + 1)
                }
                else {
                    setIsFocus(true)
                    setCountSession(0)

                    setActiveSession(["", "", "", ""])
                }
            }
            else {
                if (temp1 <= t1) {
                    let m = Math.floor((t1 - temp1) / 60)
                    let s = (t1 - temp1) % 60
    
                    setFill({
                        strokeDashoffset: 911 - 911 * temp1 / t1,
                        stroke: "rgb(12, 192, 106)",
                        timer: (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
                    })
    
                    setTemp1(temp1 + 1)
                }
                else {
                    setIsFocus(false)
                }
            }
        }
        else {
            setTemp1(0)
            
            if (temp2 <= t2) {
                let m = Math.floor((t2 - temp2) / 60)
                let s = (t2 - temp2) % 60

                setFill({
                    strokeDashoffset: 911 - 911 * temp2 / t2,
                    stroke: "rgb(222, 85, 106)",
                    timer: (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
                })

                setTemp2(temp2 + 1)
            }
            else {
                setIsFocus(true)
                setCountSession(countSession + 1)

                setActiveSession(prevValue => {
                    for (let i = 0; i <= countSession; i++) {
                        prevValue[i] = "active"
                    }
        
                    return [...prevValue]
                })
            }
        }        
    }    

    useInterval(() => {
        timerCount()
    }, isPlaying ? 1000 : null)

    const ClickPlay = (e) => {
        setIsPlaying(!isPlaying)
    }

    const ClickReset = () => {
        setFill({
            strokeDashoffset: 911,
            stroke: "rgb(0, 0, 0)",
            timer: "25:00"
        })
        setTemp1(0)
        setTemp2(0)
        setCountSession(0)
        setActiveSession(["", "", "", ""])

        setIsPlaying(false)
    }

    return (
        <>
            <div className="pomodoro">
                <Header />
                <div className="timer-section">
                    <div className="count-session">
                        <span className={activeSession[0]}></span>
                        <span className={activeSession[1]}></span>
                        <span className={activeSession[2]}></span>
                        <span className={activeSession[3]}></span>
                    </div>
                    <div className="clock">
                        <svg>
                            <circle cx="145" cy="145" r="145"></circle>
                            <circle cx="145" cy="145" r="145" id="fill" style={{stroke : fill.stroke, strokeDashoffset : fill.strokeDashoffset}}></circle>
                        </svg>
                        <div className="timer">
                            <span id="timer">{fill.timer}</span>
                        </div>
                    </div>
                    <div className="timer-btn">
                        <button id="start" type="button" onClick={ClickPlay}>{isPlaying ? "PAUSE" : "PLAY"}</button>
                        <button id="reset" type="reset" onClick={ClickReset}>RESET</button>
                    </div>
                </div>
            </div>
        </>
    )
}