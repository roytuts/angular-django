import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8000/users';  // Base URL to REST API
  
  constructor(private http: HttpClient) { }
  
  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
  
  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<any> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url);
  }
  
  /** POST: add a new user to the server */
  addUser(user: User) {
	//console.log(user);
    return this.http.post(this.userUrl, user, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'});
  }
  
  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl, user, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'});
  }
  
  /** DELETE: delete the user from the server */
  deleteUser(user: User) {
	  if (confirm("Are you sure to delete?")) {
		const url = `${this.userUrl}`;
		console.log(user);
		const options = {
		  headers: new HttpHeaders({
			'Content-Type': 'application/json',
		  }),
			body: user,
		  responseType: 'text' as 'json'
		};
		return this.http.delete(url + '/' + user.id, options);
	  }
	  return of({});
  }

}
