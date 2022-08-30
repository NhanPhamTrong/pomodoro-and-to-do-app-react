import { Navbar } from "./components/Navbar/Navbar"
import { Header } from "./components/Header/Header"
import { Pomodoro } from "./pages/Pomodoro/Pomodoro"
import { TaskSection } from "./pages/TaskSection/TaskSection"
import { AddTaskSection } from "./pages/AddTaskSection/AddTaskSection"
import { useState } from "react"

export const App = () => {
    const [mainLeft, setMainLeft] = useState("-100%")
    const [task, setTask] = useState({
        unsorted: [],
        sorted: []
    })
    const [isSorted, setIsSorted] = useState(false)
    const [statistic, setStatistic] = useState([true, false, false])

    const OpenPomodoro = () => {
        setMainLeft("0")
    }

    const OpenTaskSection = () => {
        setMainLeft("-100%")
    }

    const OpenAddTaskSection = () => {
        setMainLeft("-200%")
    }    

    const AddTask = (newTask) => {
        if (newTask.name.trim().length !== 0 && newTask.priority !== "") {
            task.unsorted.push(newTask)
        }

        setTask(prevValue => {
            return ({
                unsorted: [...prevValue.unsorted],
                sorted: [...prevValue.sorted]
            })
        })
        
        if (statistic[2]) {
            GetCompleted()
        }
    }

    const DeleteTask = () => {
        setTask(prevValue => {
            return ({
                unsorted: [...prevValue.unsorted.filter((item) => item.id !== -1)],
                sorted: [...prevValue.sorted]
            })
        })
    }

    const CompletedTask = () => {
        setTask(prevValue => {
            return ({
                unsorted: [...prevValue.unsorted],
                sorted: [...prevValue.sorted]
            })
        })

        if (statistic[1]) {
            GetActive()
        }
        else if (statistic[2]) {
            GetCompleted()
        }
    }

    const GetCompleted = () => {
        setStatistic([false, false, true])
        let chosenTask = task.unsorted.map((item) => {
            item.isShown = item.isCompleted ? true : false
            return item
        })

        setTask(prevValue => {
            return ({
                unsorted: chosenTask,
                sorted: [...prevValue.sorted]
            })
        })
    }

    const GetActive = () => {
        setStatistic([false, true, false])
        let chosenTask = task.unsorted.map((item) => {
            item.isShown = item.isCompleted ? false : true
            return item
        })

        setTask(prevValue => {
            return ({
                unsorted: chosenTask,
                sorted: [...prevValue.sorted]
            })
        })
    }

    const GetAll = () => {
        setStatistic([true, false, false])
        let chosenTask = task.unsorted.map((item) => {
            item.isShown = true
            return item
        })

        setTask(prevValue => {
            return ({
                unsorted: chosenTask,
                sorted: [...prevValue.sorted]
            })
        })
    }

    const SortUp = () => {
        let low = task.unsorted.filter((item) => item.priority === "Low")
        let medium = task.unsorted.filter((item) => item.priority === "Medium")
        let high = task.unsorted.filter((item) => item.priority === "High")

        setIsSorted(true)
        setTask(prevValue => {
            return ({
                unsorted: [...prevValue.unsorted],
                sorted: [].concat(low).concat(medium).concat(high)
            })
        })
    }

    const SortDown = () => {
        let low = task.unsorted.filter((item) => item.priority === "Low")
        let medium = task.unsorted.filter((item) => item.priority === "Medium")
        let high = task.unsorted.filter((item) => item.priority === "High")

        setIsSorted(true)
        setTask(prevValue => {
            return ({
                unsorted: [...prevValue.unsorted],
                sorted: [].concat(high).concat(medium).concat(low)
            })
        })
    }

    const Unsorted = () => {
        setIsSorted(false)
        setTask(prevValue => {
            return ({
                unsorted: [...prevValue.unsorted],
                sorted: [...prevValue.sorted]
            })
        })
    }

    return (
        <>
            <Navbar
                OpenPomodoro={OpenPomodoro}
                OpenTaskSection={OpenTaskSection} />
            <Header number={task.unsorted.length} />
            <main style={{left : mainLeft}}>
                <Pomodoro />
                <TaskSection
                    task={isSorted ? task.sorted : task.unsorted}
                    statistic={statistic}
                    DeleteTask={DeleteTask}
                    CompletedTask={CompletedTask}
                    GetCompleted={GetCompleted}
                    GetActive={GetActive}
                    GetAll={GetAll}
                    SortUp={SortUp}
                    SortDown={SortDown}
                    Unsorted={Unsorted}
                    OpenAddTaskSection={OpenAddTaskSection} />
                <AddTaskSection
                    onSubmit={AddTask}
                    ReturnTaskSection={OpenTaskSection} />
            </main>
        </>
    )
}