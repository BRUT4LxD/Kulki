import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import '../../styles.scss';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  constructor(private router: Router, private httpService: HttpService) {
  }
  @ViewChild('main') mainDiv: ElementRef;

  public user: User = {
    name: null,
    email: null,
    password: null
  };
  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  setGuest() {
    this.httpService.setGuestAndNavigate('/home');
  }
  checkLogin() {
    this.httpService.login(this.user.email, this.user.password)
              .subscribe(a => {
                this.user = a;
              }
                , err => console.log(err),
                () => {
                  if (this.user != null) {
                    Resources.IS_LOGGED_IN = true;
                  }
                  Resources.USER = this.user;
                  if (Resources.IS_LOGGED_IN) {
                    this.router.navigate(['/home']);
                  } else {
                    alert(Resources.LANGUAGE === 'en' ? 'Invalid email or password' : 'Nieprawidłowy email lub hasło');
                  }
                });
    return;
  }

}
