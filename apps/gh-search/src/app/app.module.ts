import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IsAuthGuard } from './is-auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { SearchComponent } from './search/search.component';
import { SearchModule } from './search/search.module';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    SearchModule,
    RouterModule.forRoot(
      [
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'auth',
          canActivate: [AuthGuard],
          component: SearchComponent,
        },
        {
          path: 'search',
          component: SearchComponent,
          canActivate: [IsAuthGuard],
        },
        {
          path: '**',
          redirectTo: 'search',
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
