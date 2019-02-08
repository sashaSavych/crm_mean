import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialHelperService } from '../shared/services/materialHelperService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

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
        MaterialHelperService.showToastMessage('Since now you may log into the system');
      } else if(params['accessDenied']) {
        MaterialHelperService.showToastMessage('You have to be authorized.');
      } else if(params['sessionFailed']) {
        MaterialHelperService.showToastMessage('Log into system.');
      }
    })
  }

  onSubmit(): void {
    this.form.disable();
    this.subscription = this.authService.login(this.form.value)
      .subscribe(
        () => this.router.navigate(['/overview']),
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
