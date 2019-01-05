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
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService, private router: Router, private httpService: HttpService) {
    this.loadSetting();
    translate.setDefaultLang(Resources.LANGUAGE);
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
  loadSetting() {
    this.httpService.getSettings().subscribe( (a: any) => {
      Resources.LANGUAGE = a.language;
      Resources.THEME = a.theme;
    }, err => console.log(err),
    () => {
      this.switchLanguage(Resources.LANGUAGE);
    });
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
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
                    alert('Invalid email or password');
                  }
                });
    return;
  }

}
