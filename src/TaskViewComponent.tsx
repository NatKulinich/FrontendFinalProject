import React from "react";
import { RouteComponentProps } from "react-router-dom";
import {TaskModel} from "./TaskModel";
import {dataService} from "./DataService";
import Container from "react-bootstrap/esm/Container";
import {Button, Col, Row} from "react-bootstrap";

interface RouteParams {
    id: string;
}
interface TaskComponentProps extends RouteComponentProps<RouteParams> {}
interface TaskComponentState {
    item: TaskModel | null;
}

export class TaskViewComponent extends React.Component<TaskComponentProps, TaskComponentState>{

    constructor(props: Readonly<TaskComponentProps> | TaskComponentProps) {
        super(props);
        this.state = {
            item: null
        }

        dataService.getById(this.props.match.params.id).then(value => {
            this.setState({
                ...this.state,
                item: value
            })
        });
    }

    formatDate(unixTime: number): string {
        let dateTimeFormat = new Intl.DateTimeFormat('ru');
        return dateTimeFormat.format(new Date(unixTime));
    }

    private assign4me(value: TaskModel  | null) {
        if (value) {
            dataService.assignTask(value);
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        {
                            this.state.item && (
                                <>
                                    <p className="h2">{this.state.item.description}</p>
                                    <p className="h5">Дата создания: {this.formatDate(this.state.item.crdate)}</p>
                                    <p>Оценка трудозатрат (часы): {this.state.item.plantime}</p>
                                    <p>Затраченное время(часы): {this.state.item.sumtrackedtime}</p>
                                    <p>Исполнители:</p>
                                    <ul>
                                        {
                                            this.state.item.responsible.map(value => {
                                                return(
                                                    <li>{value}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <Button variant="primary" onClick={event => this.assign4me(this.state.item)}> Добавить в Мои задачи</Button>
                                </>

                            )
                        }
                    </Col>
                </Row>
            </Container>

        );
    }
}