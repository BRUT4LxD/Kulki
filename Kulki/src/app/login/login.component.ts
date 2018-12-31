import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import '../../styles.scss';
import { Route, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService, private router: Router, private httpService: HttpService) {
    this.loadSetting();
    translate.setDefaultLang('en');
  }
  @ViewChild('main') mainDiv: ElementRef;

  private email: string;
  private password: string;
  private user: any;
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
    this.httpService.setGuest()
        .subscribe(
          a => console.log(a),
          err => console.log(err),
          () => this.router.navigate(['/home'])
        );
  }
  checkLogin() {
    this.httpService.login(this.email, this.password)
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
