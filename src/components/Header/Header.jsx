import "./Header.scss"

export const Header = (props) => {
    return (
        <header>
            <div className="container">
                <h1>{props.number}</h1>
                <p>total tasks in project</p>
            </div>
        </header>
    )
}