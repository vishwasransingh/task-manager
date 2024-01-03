export default function TaskListComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())
    const tasks = [
                    {id: 1, title: 'Task1', targetDate:targetDate},
                    {id: 2, title: 'Task2', targetDate:targetDate},
                    {id: 3, title: 'Task3', targetDate:targetDate},
                ]


    return (
        <div className="container">
            <h1>Your Tasks : </h1>
            <div>
                <table>
                    <thead>
                            <tr>
                                <td>ID</td>
                                <td>Description</td>
                                <td>Target Date</td>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(
                            task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.targetDate.toDateString()}</td>
                                </tr>
                            )
                        )
                    }

                    </tbody>

                </table>
            </div>
        </div>
    )
}