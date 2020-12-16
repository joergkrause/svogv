import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmitterService, SiteApiService } from './services';
import { MinitabsComponent, TabsComponent } from './components';
import { UserViewModel, UserViewModelList } from './viewmodels';
import { PercentPipe } from './pipe/percent.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TabsComponent, MinitabsComponent, PercentPipe
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    SiteApiService, EmitterService, TabsComponent, MinitabsComponent,
    UserViewModel, UserViewModelList
  ],
  providers: [SiteApiService, EmitterService]
})
export class DemoUiModule { }
