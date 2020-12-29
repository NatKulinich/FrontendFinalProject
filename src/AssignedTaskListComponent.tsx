import React from "react";
import {Task4user} from "./Task4user";
import {dataService} from "./DataService";
import {Card, Col, ListGroup, Row, Table} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import {TaskModel} from "./TaskModel";
interface AssignesState{
    assign: Task4user[],
    taskMapping: Map<number, TaskModel>;
}

export class AssignedTaskListComponent extends React.Component<{}, AssignesState>{

    constructor(props: Readonly<{}> | {}) {
        super(props);
        this.state = {
            assign: [],
            taskMapping: new Map<number, TaskModel>()
        }

        dataService.getAssignment().then(value => {
            this.setState({
                ...this.state,
                assign: value
            })

            let mapping: Map<number,TaskModel> = new Map<number, TaskModel>();
            value.forEach(async taskAssigned => {
                let taskItem = await dataService.getById(taskAssigned.tid.toString());

                if (taskItem != null) {
                    mapping.set(taskAssigned.tid, taskItem);
                }

                this.setState({
                    ...this.state,
                    taskMapping: mapping
                });
            })
        })
    }

    formatDate(unixTime: number): string {
        let dateTimeFormat = new Intl.DateTimeFormat('ru');
        return dateTimeFormat.format(new Date(unixTime));
    }

    render() {
        return (
            <Container fluid>
                <p> </p>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Описание</th>
                        <th>Оценка трудозатрат (часы)</th>
                        <th>Затраченное время(часы)</th>
                    </tr>
                    </thead>
                    {
                        this.state.assign.length > 0 && this.state.assign.map(value => {
                            return (
                                <tr>
                                    <td>{value.id}</td>
                                    <td>{this.state.taskMapping.get(value.tid)?.description}</td>
                                    <td>{this.state.taskMapping.get(value.tid)?.plantime}</td>
                                    <td>{this.state.taskMapping.get(value.tid)?.sumtrackedtime}</td>
                                </tr>
                            );
                        })
                    }

                </Table>
                {
                    this.state.assign.length === 0 && (<p>Задач к выполнению сейчас нет</p>)
                }
            </Container>
        );
    }
}