import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'
import { CreateComponent } from './create/create.component'

/*import {FaqComponent} from "./faq/faq.component";
import {ImpressComponent} from "./impress/impress.component";
import {ExampleComponent} from "./example/example.component";
import {AppComponent} from "./app.component";
import { ResultPageComponent } from './result-page/result-page.component'*/

export const routes: Routes = [
  { path: '**', component: CreateComponent },
  /*{ path: 'create', component: CreateComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'impress', component: ImpressComponent},
  { path: 'example', component: ExampleComponent},
  { path: '**', component: CreateComponent },
  { path: 'result',  component: ResultPageComponent },*/
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
