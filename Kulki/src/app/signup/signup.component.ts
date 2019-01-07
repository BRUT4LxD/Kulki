import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from '../resources';
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
    translate.setDefaultLang(Resources.LANGUAGE);
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
            err => {
              let friendlyMessage;
              Resources.LANGUAGE === 'en' ?
                friendlyMessage = 'Failed to create user. ' :
                friendlyMessage = ' Błąd podczas tworzenia użytkownika. ';
              if (err != null) {
                Resources.LANGUAGE === 'en' ?
                  friendlyMessage += 'Email is already in use. ' :
                  friendlyMessage += 'Podany Email jest już używany. ';
              } else {
                Resources.LANGUAGE === 'en' ?
                  friendlyMessage += 'There was an unknown problem with the server' :
                  friendlyMessage += 'Wystąpił nieznany problem z serwerem' ;
              }
              alert(friendlyMessage);
            },
            () => this.router.navigate(['/login']));
  }

}
