class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        }

        this.add = this.add.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    componentDidMount() {
        fetch('/tasks')
            .then(data => data.json())
            .then(data => {
                this.setState({ tasks: data });
            });

        // fetch('/task?id=1&name=hola')
        //     .then(data => {
        //         debugger
        //     })
        //     .catch(err => {
        //         debugger
        //     });
    }

    add() {
        const message = prompt('Introduce el mensaje');
        const task = {
            Task: message,
        };

        fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        })
            .then(data => data.json())
            .then(data => {
                this.setState({
                    tasks: [...this.state.tasks, data],
                });
            })
            .catch(err => {
                alert("Algo salio mal");
            })

    }

    completeTask(task) {
        const that = this;
        return function() {
            const index = that.state.tasks.findIndex(item => item.ID === task.ID);

            fetch('/tasks', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(that.state.tasks[index]),
            })
                .then(data => data.json())
                .then(task => {
                    const clone = [...that.state.tasks];
                    clone.splice(index, 1, task);
                    that.setState({
                        tasks: clone,
                    });
                })
                .catch(err => {
                    alert("Algo salio mal");
                });
        }
    }

    render() {
        const pendingTasks = this.state.tasks.filter(i => !i.status);
        const completedTasks = this.state.tasks.filter(i => i.status);;

        return (
            <div>
                <h1 type="">TODO <span>Una app de tareas</span></h1>

                <section>
                    <h3>Tareas pendientes</h3>
                    <button onClick={this.add}>
                        añadir
                    </button>
                    <ul>
                        {pendingTasks.length === 0 && (
                            <li>No hay tareas</li>
                        )}
                        {pendingTasks.map(task => (
                            <ListItem onChange={this.completeTask(task)} key={task.ID} taskName={task.Task} />
                        ))}
                    </ul>
                </section>

                <section>
                    <h3>Tareas completadas</h3>
                    <ul>
                        {completedTasks.length === 0 && (
                            <li>No hay tareas</li>
                        )}
                        {completedTasks.map(task => (
                            <ListItem key={task.ID} taskName={task.Task} checked disabled />
                        ))}
                    </ul>
                </section>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
