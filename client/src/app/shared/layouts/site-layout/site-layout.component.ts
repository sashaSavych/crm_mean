import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialHelperService } from '../../services/materialHelperService';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  menuLinks: { link: string; name: string}[] = [
    { link: '/overview', name: 'Overview'},
    { link: '/analytics', name: 'Analytics'},
    { link: '/history', name: 'History'},
    { link: '/order', name: 'Order'},
    { link: '/categories', name: 'Assortment'}
  ];

  @ViewChild('floatingEl') floatingEl: ElementRef;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngAfterViewInit() {
    MaterialHelperService.initFloatingButton(this.floatingEl.nativeElement);
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
