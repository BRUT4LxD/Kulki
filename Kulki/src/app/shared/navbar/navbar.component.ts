import { Component,  AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Resources } from 'src/app/resources';
import '../../../styles.scss';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  constructor(private httpService: HttpService, private router: Router) {
    if (!Resources.IS_LOGGED_IN) {
      httpService.setGuest();
    }
  }
  @ViewChild('main') mainDiv: ElementRef;
  ngAfterViewInit(): void {
    this.mainDiv.nativeElement.className = 'main-view ' + Resources.THEME;
  }
  logout() {
    this.httpService.setGuestAndNavigate('/login');
    Resources.IS_LOGGED_IN = false;
  }
}
