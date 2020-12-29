import React from "react";
import {dataService} from "./DataService";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {TaskModel} from "./TaskModel";
import {Link, RouteComponentProps} from "react-router-dom";
// import { RouteComponentProps } from "react-router-dom";

interface TaskListState{
    tasklist: TaskModel[];
}
// interface RouteParams {
//     id?: string;
// }
// interface TaskComponentProps extends RouteComponentProps<RouteParams> {}

export class ProjectsListComponent extends React.Component<{}, TaskListState>{

    constructor(props: Readonly<{}> | {}) {
        super(props);
        this.state = {
            tasklist: []
        };

        dataService.getAll().then((value: any) => {
            this.setState({
                ...this.state,
                tasklist: value
            })
        });
    }

    formatDate(unixTime: number): string {
        let dateTimeFormat = new Intl.DateTimeFormat('ru');
        return dateTimeFormat.format(new Date(unixTime));
    }

    render() {
        return (
            <div className="py-md-3 pl-md-5">
                <Container fluid>
                    <Row>
                        {
                            this.state.tasklist.map(value => {
                                return (
                                    <Col sm={12} xs={12} md={12}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Проект {value.pid}. Задача {value.tid}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">
                                                    Дата создания:
                                                    {this.formatDate(value.crdate)}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    {value.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    Оценка (часы): {value.plantime}
                                                </Card.Text>
                                                <Link to={`/tasks/${value.tid}`}><Button variant="primary">Подробнее</Button></Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Container>
            </div>

        );
    }
}