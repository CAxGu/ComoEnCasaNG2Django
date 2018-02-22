import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared';
import { SearchComponent } from './search.component';
import { ResultComponent } from './result.component';


const searchRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'search/results',
    component: SearchComponent
  }
]);

@NgModule({
  imports: [
    searchRouting,
    CommonModule,
    SharedModule
  ],
  declarations: [
    SearchComponent,
    ResultComponent
  ],
  providers:[

  ]
})
export class SearchModule { }

