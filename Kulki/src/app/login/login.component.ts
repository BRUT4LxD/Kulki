import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import '../../styles.scss';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { User } from '../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService, private http: HttpClient, private router: Router) {
    translate.setDefaultLang('en');
  }
  @ViewChild('main') mainDiv: ElementRef;

  private email: string;
  private password: string;
  private url = 'http://localhost:8080/user?';
  private user: any;
  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
  }
  checkLogin() {
    this.http.get(`${this.url}email=${this.email}&password=${this.password}`)
              .subscribe(a => {
                this.user = a;
              }
                , err => console.log(err),
                () => {
                  if (this.user != null) {
                    Resources.IS_LOGGED_IN = true;
                  }
                  console.log(this.user.name);
                  Resources.USER = this.user;
                  console.log('this is a user' , Resources.USER);
                  if (Resources.IS_LOGGED_IN) {
                    this.router.navigate(['/home']);
                  } else {
                    alert('Invalid email or password');
                  }
                });
    return;
  }

}
