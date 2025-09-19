const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({total}) => <h4>Number of exercises {total}</h4>

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
        </div>
    )
}

export default Course