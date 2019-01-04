import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService, private httpService: HttpService, private router: Router) {
    translate.setDefaultLang('en');
  }
  @ViewChild('main') mainDiv: ElementRef;

  public agreedOnTermis = false;

  public user: User = {
    name: null,
    email: null,
    password: null
  };

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
    this.httpService.createPlayer(this.user)
          .subscribe(
            a => a,
            err => console.log(err),
            () => this.router.navigate(['/login']));
  }

}
