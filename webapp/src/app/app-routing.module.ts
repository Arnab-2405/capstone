import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingVendorComponent } from './components/landing-vendor/landing-vendor.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { LandingActualVendorComponent } from './components/landing-actual-vendor/landing-actual-vendor.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'contact-us',component:ContactUsComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'update-profile',component:UpdateProfileComponent},
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
