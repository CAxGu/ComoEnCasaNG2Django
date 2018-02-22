import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpModule } from '@angular/http';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { dotenv } from '../environments/dotenv';

import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { SearchModule } from './search/search.module';
import { SettingsModule } from './settings/settings.module';
import { LocalesModule} from './locales/locales.module';
import { ContactModule } from './contact/contact.module';
import { StripeModule } from './stripe/stripe.module';
import { 
  ApiService,
  ArticlesService,
  AuthGuard,
  CommentsService,
  CategoriasService,
  LocalesService,
  FooterComponent,
  HeaderComponent,
  JwtService,
  ProfilesService,
  SharedModule,
  TagsService,
  UserService,
  ContactService,
  CheckoutService,
  CartService,
  SearchService
} from './shared';


let providers = {
  "google": {
    "clientId": dotenv.GOOGLEID
  },
  "facebook": {
    "clientId": dotenv.FBID,
    "apiVersion": "v2.4"
  }
};

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    ArticleModule,
    AuthModule,
    EditorModule,
    HomeModule,
    ProfileModule,
    rootRouting,
    SharedModule,
    SettingsModule,
    HttpModule,
    LocalesModule,
    ContactModule,
    Angular2SocialLoginModule,
    StripeModule,
    SearchModule
  ],
  providers: [
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    JwtService,
    CategoriasService,
    ProfilesService,
    TagsService,
    UserService,
    LocalesService,
    CheckoutService,
    CartService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);