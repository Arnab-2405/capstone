import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingVendorComponent } from './components/landing-vendor/landing-vendor.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { LandingActualVendorComponent } from './components/landing-actual-vendor/landing-actual-vendor.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'landing',
    children: [
      { path: 'user', component: LandingVendorComponent },
      { path: 'vendor', component: LandingActualVendorComponent },
    ],
  },
  { path: 'payment', component: PaymentComponent },
  {
    path: 'admin',
    children: [{ path: 'dashboard', component: AdminViewComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
