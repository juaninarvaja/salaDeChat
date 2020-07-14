import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'error/:mensaje', loadChildren: './error/error.module#ErrorPageModule' },
  { path: 'error', loadChildren: './error/error.module#ErrorPageModule' },
  { path: 'aula/:aulaSelected', loadChildren: './pages/aula/aula.module#AulaPageModule' },
  { path: 'aula-b/:aulaSelected', loadChildren: './pages/aula-b/aula-b.module#AulaBPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
