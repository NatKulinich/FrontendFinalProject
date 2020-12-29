import { TaskModel } from "./TaskModel";
import {ProjectModel} from "./ProjectModel";
import {Task4user} from "./Task4user";
import App from "./App";
interface User {
    userName: string;
    password: string;
}

class DataService{
    private static DB_URL = "http://localhost:4000";

    public async getAll(): Promise<TaskModel[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/tasks`);
        let response: Response = await todoResponsePromise;
        let jsonPromise: Promise<TaskModel[]> = response.json();
        return await jsonPromise;
    }

    public async getByProject(id: string): Promise<ProjectModel[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/tasks?pid=${id}`);
        let response: Response = await todoResponsePromise;
        let jsonPromise: Promise<ProjectModel[]> = response.json();
        return await jsonPromise;
    }

    public async getById(id:string): Promise<TaskModel | null>{
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/tasks?tid=${id}`);
        let response: Response = await todoResponsePromise;
        let jsonPromise: Promise<TaskModel[]> = response.json();
        let taskItems = (await jsonPromise)
        if (taskItems.length) {
            return taskItems[0];
        }
        return null;
    }

    public async assignTask(item: TaskModel): Promise<boolean> {
        let realAssign = await this.getAssignment();
        let isAssign = realAssign.find(value => value.tid === item.tid);
        let isNewTask: boolean = isAssign == null;
        let user = localStorage.getItem(App.KEY_USER)
        if (!user) {user = "noname"}

        if (!isAssign) {
            isAssign = {
                userid: user,
                tid: item.tid
            };
        }

        let postPromise = fetch(`${DataService.DB_URL}/task4user${isNewTask ? "" : "/" + isAssign.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: isNewTask ? "POST" : "PATCH",
            body: JSON.stringify(isAssign)
        });

        return await (await postPromise).json();
    }

    public async getAssignment(): Promise<Task4user[]> {
        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/task4user`);
        let response: Response = await todoResponsePromise;
        let jsonPromise: Promise<Task4user[]> = response.json();
        return await jsonPromise;
    }
}

export const dataService = new DataService();