import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {JwtInterceptor} from './shared/interceptor/jwt.interceptors';
import {BackendMock, backendMock} from './shared/interceptor/http/backend.mock';
import {SharedModule} from './modules/shared.module';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from './services/user.service';
import { TopComponent } from './screens/top/top.component';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {environment} from '../environments/environment';
import {BackendDemo} from './shared/interceptor/http/backend.demo';
import {Profile} from './shared/profile';
import {BackendDevelop} from './shared/interceptor/http/backend.develop';
import {BackendStaging} from './shared/interceptor/http/backend.staging';
import {BackendService} from './shared/interceptor/http/backend.service';
import {BackendLocal} from './shared/interceptor/http/backend.local';

const routes: Routes = [
  {path: '', loadChildren: 'app/modules/user.module#UserModule'},
  {path: 'top', component: TopComponent, canActivate: []},
]
/**
 * Backend factory.
 */
export function createBackend(real: XHRBackend, options: RequestOptions, mock: MockBackend,
                              auth: AuthenticationService) {
  let backend;
  switch (environment.profile) {
    case Profile.mock:
      backend = new BackendMock();
      break;
    case Profile.demo:
      backend = new BackendDemo(real, options);
      break;
    case Profile.develop:
      backend = new BackendDevelop(real, options, auth);
      break;
    case Profile.staging:
      backend = new BackendStaging(real, options, auth);
      break;
    case Profile.release:
      backend = new BackendService(real, options, auth);
      break;
    default:
      backend = new BackendLocal(real, options, auth);
      break;
  }
  return backend;
}
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
      provide: Http,
      useFactory: (createBackend),
      deps: [XHRBackend, RequestOptions, MockBackend, AuthenticationService]
    },
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

