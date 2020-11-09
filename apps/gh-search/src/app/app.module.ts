import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { SearchComponent } from './search/search.component';
import { SearchModule } from './search/search.module';

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
          path: 'search',
          component: SearchComponent,
          canActivate: [AuthGuard],
        },
        {
          path: '**',
          redirectTo: 'search',
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
