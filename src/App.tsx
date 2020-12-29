import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {ProjectsListComponent} from "./ProjectsListComponent";
import {TaskViewComponent} from "./TaskViewComponent";
import {AssignedTaskListComponent} from "./AssignedTaskListComponent";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Button, Form, Navbar, NavDropdown} from "react-bootstrap";
import {Task4user} from "./Task4user";
import {dataService} from "./DataService";
import {LoginComponent} from "./LoginComponent";

interface AppState{
    assign: Task4user[]
}

export class App extends React.Component<{}, AppState>{
    static KEY_USER: string = "_taskit_data";

    constructor(props: Readonly<{}> | {}) {
        super(props);

        this.state = {
            assign: []
        }

        dataService.getAssignment().then(value => {
            this.setState({
                ...this.state,
                assign: value
            })
        })
    }

    render() {
        return (
            <Router>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">Projector</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/ProjectsList">Список проектов</Nav.Link>
                        {/*<NavDropdown title="Список проектов" id="projectID">*/}
                        {/*  <NavDropdown.Item href="1">Трансформация системы учета ООО 'Компания X'</NavDropdown.Item>*/}
                        {/*  <NavDropdown.Item href="2">Первая линия поддержки ООО 'Компания Z</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    <Nav.Link href="/task4user">
                        <Form inline>
                            <Button variant="outline-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                     className="bi bi-card-checklist" viewBox="0 0 16 16">
                                    <path
                                        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                    <path
                                        d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                Мои задачи
                                <Badge className="ml-1" variant="light">{this.state.assign.length}</Badge>
                            </Button>
                        </Form>
                    </Nav.Link>
                </Navbar>
                <Switch>
                    <Route exact={true} path="/">
                        <LoginComponent />
                    </Route>
                    <Route exact={true} path="/ProjectsList">
                        <ProjectsListComponent />
                    </Route>
                    <Route path="/tasks/:id" component={TaskViewComponent}>
                    </Route>
                    <Route exact={true} path="/task4user">
                        <AssignedTaskListComponent />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
