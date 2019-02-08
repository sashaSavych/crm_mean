import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialHelperService } from '../shared/services/materialHelperService';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private subscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.minLength(5)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if(params['accessDenied']) {

      }
    })
  }

  onSubmit(): void {
    this.form.disable();
    this.subscription = this.authService.register(this.form.value)
      .subscribe(
        () => this.router.navigate(['/login'], { queryParams: { registered: true } }),
        (response: HttpErrorResponse) => {
          MaterialHelperService.showToastMessage(response.error.message);
          this.form.enable();
        }

      )
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
