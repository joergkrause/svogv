import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvogvMaterialModule } from '../../../../projects/material-ui/src/public-api';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';


import * as cmp from './components/index';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoUiModule } from '../demo-ui/demo-ui.module';

@NgModule({
  declarations: [    // Editor, Validation & Grid
    cmp.EditorNewComponent
    , cmp.EditorAutoformComponent
    , cmp.EditorFormComponent
    , cmp.EditorListComponent
    , cmp.EditorDeleteComponent
    // Widget Demos
    , cmp.WidgetDemoComponent
    , cmp.GridDemoSimpleComponent
    , cmp.GridDemoTemplateComponent
    , cmp.GridDemoComponent
    , cmp.GridFilterComponent
    , cmp.TreeviewDemoComponent
],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DemoUiModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    SvogvMaterialModule.forRoot()
  ]
})
export class DemoMaterialModule { }
