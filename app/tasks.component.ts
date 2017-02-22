import { Component } from '@angular/core';
import Datastore = require('nedb');
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'todos.component.html',
})

@Injectable()

export class TasksComponent {
    public newTask: string;
    public task: any;
    public user: any;
    public db: any;
    public tasks: any[];
    public user_id: any[];
    public username: any;
    public password: any;


    constructor(private http: Http) {
        this.newTask = '';
        this.username = '';
        this.password = '';
        this.db = new Datastore({ filename: 'db/tasks.json', autoload: true });
        this.getAll();
        this.updateTask
    }

    /*
     *  Get all task from database using http req to get data from express server
     * 
     */

    getAll() {
        this.http.get('http://localhost:8080')
            .map(this.extractTasks)
            .catch(this.handleError)
            .subscribe(
            listTodos => this.tasks = listTodos
            );
    }

    /*
     *  Extract data 
     *
     */

    extractTasks(res: Response) {
        let body = res.json();
        return body || {};
    }
    // getAllUser() {
    //     this.http.get('http://localhost:8080/login')
    //         .map(this.extractUsers)
    //         .catch(this.handleError)
    //         .subscribe(
    //         listUsers => this.users = listUsers
    //         );
    // }

    // extractUsers(res: Response) {
    //     let body = res.json();
    //     return body || {};
    // }

    // getUser() {
    //     this.user = {
    //         username: this.username,
    //         password: this.password
    //     }
    // }

    /*
     *  Catch server error 
     *
     */

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }




    public createTask() {
        this.task = {
            task: this.newTask,
            complete: false
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:8080/add', this.task)
            .map(this.extractTasks)
            .catch(this.handleError)
            .subscribe(
            listTodos => this.tasks.push(this.task)
            )
        this.getAll()
    }



    public updateTask(id: any) {
        var task: any = {
            id: id,
        };
        console.log(id)
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.put('http://localhost:8080/update', task)
            .map(this.extractTasks)
            .catch(this.handleError)
            .subscribe(
            listTodos => this.tasks.push(task)
            );

        this.getAll();
    }

    public deleteTask(id: string) {
        console.log(id)
        if (this.extractTasks.length != 0) {
            this.http.delete('http://localhost:8080/delete/' + id)
                .map(this.extractTasks)
                .catch(this.handleError)
                .subscribe(
                listTodos => this.tasks = listTodos
                )
        }
        this.getAll();
    }

    public deleteCheckedTask(tasks: any[]) {
        for (let task of tasks) {
            if (task.completed) {
                this.db.remove({}, { multi: true });
            }
        }
        console.log(tasks)
    }

    public deleteAllTask(tasks: any[]) {
        this.db.remove({}, { multi: true })
        this.getAll();
    }

}



