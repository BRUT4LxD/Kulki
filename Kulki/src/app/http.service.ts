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
private gameTop5Url = 'http://localhost:8080/games/top5';
private timeUrl = 'http://worldclockapi.com/api/json/utc/now';
private settingsUrl = '/assets/settings.json';
public getUserById(id: string) {

}
public getSettings(): Observable<any> {
  return this.http.get<any>(this.settingsUrl);
}
public getGuest() {
  return this.http.get<User>(`${this.userUrl}?email=${Resources.GUEST_EMAIL}&password=${Resources.GUEST_PASSWORD}`)
}
public setGuest() {
  this.getGuest()
      .subscribe(guest => {
        if (guest == null) {
          this.createGuest();
        } else {
          Resources.USER = guest;
        }
      },
      err => console.log('Error during guest creation: ', err));
}
public setGuestAndNavigate(path: string) {
  this.getGuest()
    .subscribe( guest => {
      if (guest == null) {
        this.createGuest();
      } else {
        Resources.USER = guest;
      }
    },
      err => console.log('Error during guest creation: ', err),
      () => {
        this.router.navigate([path]);
      });
}
public createGuest() {
  const user = new User();
  user.email = Resources.GUEST_EMAIL;
  user.password = Resources.GUEST_PASSWORD;
  user.name = Resources.GUEST_NAME;
  this.createPlayer(user)
    .subscribe( resp => resp,
                err => console.log('error during guest creation: ', err));
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
  return this.http.get<Game[]>(`${this.gameTop5Url}`);
}

}
