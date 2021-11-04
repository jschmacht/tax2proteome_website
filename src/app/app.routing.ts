import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CreateComponent } from './create/create.component';
import {TermsOfServicePageComponent} from './terms-of-service-page/terms-of-service-page.component';
import {PrivacyPolicyPageComponent} from './privacy-policy-page/privacy-policy-page.component';
import {ImpressComponent} from './impress/impress.component';


export const appRoutes: Routes = [
    { path: 'termsofservice', component: TermsOfServicePageComponent},
    { path: 'privacypolicy', component: PrivacyPolicyPageComponent},
    { path: 'impressum', component: ImpressComponent},
    { path: '**', component: CreateComponent },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

