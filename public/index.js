class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingTasks: [],
            completedTasks: [],
        }

        this.add = this.add.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    componentDidMount() {
        fetch('/tasks')
            .then(data => data.json())
            .then(data => {
                this.setState({ pendingTasks: data });
            });

        fetch('/task?id=1&name=hola')
            .then(data => {
                debugger
            })
            .catch(err => {
                debugger
            });
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
                    pendingTasks: [...this.state.pendingTasks, data],
                });
            })
            .catch(err => {
                alert("Algo salio mal");
            })

    }

    completeTask(task) {
        const that = this;
        return function() {
            debugger
            const index = that.state.pendingTasks.findIndex(item => item.ID === task.ID);
            const pendingClone = [...that.state.pendingTasks];
            const _task = pendingClone.splice(index, 1)[0];
            const completedClone = [...that.state.completedTasks, _task];
            that.setState({
                pendingTasks: pendingClone,
                completedTasks: completedClone
            });
        }
    }

    render() {
        return (
            <div>
                <h1 type="">TODO <span>Una app de tareas</span></h1>

                <section>
                    <h3>Tareas pendientes</h3>
                    <button onClick={this.add}>
                        añadir
                    </button>
                    <ul>
                        {this.state.pendingTasks.length === 0 && (
                            <li>No hay tareas</li>
                        )}
                        {this.state.pendingTasks.map(task => (
                            <ListItem onChange={this.completeTask(task)} key={task.ID} taskName={task.Task} />
                        ))}
                    </ul>
                </section>

                <section>
                    <h3>Tareas completadas</h3>
                    <ul>
                        {this.state.completedTasks.length === 0 && (
                            <li>No hay tareas</li>
                        )}
                        {this.state.completedTasks.map(task => (
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
