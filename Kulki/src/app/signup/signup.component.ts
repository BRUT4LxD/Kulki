import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService, private httpService: HttpService) {
    translate.setDefaultLang('en');
  }
  @ViewChild('main') mainDiv: ElementRef;

  public name: string;
  public email: string;
  public password: string;

  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
  }
  createPlayer() {
    console.log('siema');
    const user = new User();
    user.email = this.email;
    user.name = this.name;
    user.password = this.password;
    this.httpService.createPlayer(user)
          .subscribe(
            a => console.log(a),
            err => console.log(err),
            () => console.log(user));
  }

}
