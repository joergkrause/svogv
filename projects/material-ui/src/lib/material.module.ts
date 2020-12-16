import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import * as wd from './widgets/index';

import { SvogvCoreModule } from '@svogv/core';
// import { FormValidatorFromJsonService } from './services/formvalidator-fromjson.service';

const SVOGV_COMPONENTS = [
  wd.DataGridComponent,
  wd.DataGridPaginationComponent,
  wd.TreeViewComponent,
  wd.TreeViewNodeComponent,
  wd.EditorComponent,
  wd.AutoFormComponent
];

const provider = [SvogvCoreModule];

const material = [MatInputModule, MatButtonModule,MatCheckboxModule,MatSelectModule,MatListModule,MatTableModule,MatPaginatorModule];

/**
 * The actual SVOGV Module definition.
 */
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...material],
  declarations: [...SVOGV_COMPONENTS, wd.FormatDataPipe],
  providers: provider,
  exports: SVOGV_COMPONENTS
})
export class SvogvMaterialModule {

  public static forRoot(): ModuleWithProviders<SvogvMaterialModule> {
    return {
      ngModule: SvogvMaterialModule,
      providers: provider
    };
  }

}
