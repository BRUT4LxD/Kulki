import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Resources } from 'src/app/resources';
import '../../../styles.scss';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService, private httpService: HttpService, private router: Router) {
    if (!Resources.IS_LOGGED_IN) {
      httpService.setGuest().subscribe(guest => Resources.USER = guest);
    }
    translate.setDefaultLang('en');
  }
  @ViewChild('main') mainDiv: ElementRef;
  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  logout() {
    this.httpService.setGuest()
        .subscribe( (guest: any) => {
          Resources.USER = guest;
        },
        err => console.log(err),
        () => this.router.navigate(['/login']));
    Resources.IS_LOGGED_IN = false;
  }
  ngOnInit() {
    this.switchLanguage(Resources.LANGUAGE);
  }
}
