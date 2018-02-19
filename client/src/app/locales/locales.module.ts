import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { dotenv } from '../../environments/dotenv';

import { LocalesComponent } from './locales.component';
import { LocalesListComponent } from './localeslist.component';
import { LocalDetailsComponent } from './localdetails.component';
import { SharedModule, ProductosService} from '../shared';
import {LocalResolver} from './locales-resolver.service';
import { LocalesProductComponent } from './locales-product/locales-product.component';

const localRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'locales',
    component: LocalesComponent
  },
  {
    path: 'locales/:id',
    component: LocalDetailsComponent,
    resolve: {
      local: LocalResolver
    }
  },
  {
    path: ':categoria',
    component: LocalesComponent
  }
]);

@NgModule({
  imports: [
    localRouting,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: dotenv.GMAPS_KEY
    })
  ],
  declarations: [
    LocalesComponent,
    LocalesListComponent,
    LocalDetailsComponent,
    LocalesProductComponent
  ],
  providers: [
    LocalResolver,
    ProductosService
  ]
})
export class LocalesModule { }
