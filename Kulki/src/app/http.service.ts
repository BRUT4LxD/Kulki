import { Injectable } from '@angular/core';
import { Resources } from './resources';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './Models/user';
import { Game } from './Models/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

constructor(private http: HttpClient, private router: Router) { }

private userUrl = 'http://localhost:8080/user';
private gameUrl = 'http://localhost:8080/game';
private timeUrl = 'http://worldclockapi.com/api/json/utc/now';
private settingsUrl = '/assets/settings.json';
public getUserById(id: string) {

}
public getSettings(): Observable<any> {
  return this.http.get<any>(this.settingsUrl);
}
public setGuest(): Observable<User> {
  return this.http.get<User>(`${this.userUrl}/5`);
}
public createPlayer(user: User): Observable<User> {
  return this.http.post<User>(this.userUrl, user, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
public createGame(game: Game): Observable<Game> {
  return this.http.post<Game>(`${this.gameUrl}/${Resources.USER.id}`, game);
}
public getTime(): Observable<any> {
  return this.http.get<any>(this.timeUrl);
}
public login(email: string, password: string): Observable<User> {
  return this.http.get<User>(`${this.userUrl}?email=${email}&password=${password}`);
}
public getTop5Results(): Observable<Game[]> {
  return this.http.get<Game[]>(`${this.gameUrl}/${!Resources.IS_LOGGED_IN ? '5' : Resources.USER.id}`);
}

}
