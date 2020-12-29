import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {dataService} from "./DataService";
import {Alert, Col} from "react-bootstrap";
import App from "./App";
import Nav from "react-bootstrap/Nav";

export function LoginComponent() {

    let [login, changeLogin] = useState("");
    const history = useHistory();

    async function onLoginClicked() {
        let tasksJSONString = JSON.stringify(login);
        localStorage.setItem(App.KEY_USER, tasksJSONString);
    }

    return (
        <Col md={"4"}>
            <form className="form-signin" >

                <h1 className="h3 mb-3 font-weight-normal">Укажите имя пользователя</h1>


                <label htmlFor="inputLogin" className="sr-only">Login</label>
                <input value={login} onChange={event => changeLogin(event.target.value)} id="inputLogin"
                       className="form-control" placeholder="Login"/>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <Nav.Link href="/ProjectsList">
                <button onClick={onLoginClicked} type={"button"} className="btn btn-lg btn-primary btn-block">Sign in
                </button>
                </Nav.Link>
                <p className="mt-5 mb-3 text-muted">© 2020</p>
            </form>
        </Col>

    );
}