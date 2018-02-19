import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
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
  CheckoutService
} from './shared';
// import { LocalesComponent } from './locales/locales.component';
/* import { CategoriasComponent } from './categorias/categorias.component'; */

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    // LocalesComponent,
    // CategoriasComponent
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
    StripeModule
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
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

