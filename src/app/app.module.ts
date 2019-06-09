import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {JwtInterceptor} from './shared/interceptor/jwt.interceptors';
import {backendMock} from './shared/interceptor/http/backend.mock';
import {SharedModule} from './modules/shared.module';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from './services/user.service';
import { TopComponent } from './screens/top/top.component';

const routes: Routes = [
  {path: '', loadChildren: 'app/modules/user.module#UserModule'},
  {path: 'top', component: TopComponent, canActivate: []},
]

@NgModule({
  declarations: [
    AppComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [
    AuthGuard,
    // AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // provider used to create fake backend
    backendMock
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

