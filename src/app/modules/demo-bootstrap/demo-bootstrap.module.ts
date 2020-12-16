import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvogvBootstrapModule } from '../../../../projects/bootstrap-ui/src/public-api';
import * as cmp from './components/index';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoUiModule } from '../demo-ui/demo-ui.module';

@NgModule({
  declarations: [
    // Editor, Validation & Grid
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DemoUiModule,
    SvogvBootstrapModule.forRoot()
  ]
})
export class DemoBootstrapModule { }
