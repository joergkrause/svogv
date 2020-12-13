import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as wd from './widgets/index';

import { FormValidatorService } from './services/formvalidator.service';
// import { FormValidatorFromJsonService } from './services/formvalidator-fromjson.service';

const provider = [FormValidatorService]; // , FormValidatorFromJsonService];

/**
 * The actual SVOGV Module definition.
 */
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [wd.FormatDataPipe],
  providers: provider
})
export class SvogvCoreModule {

  public static forRoot(): ModuleWithProviders<SvogvCoreModule> {
    return {
      ngModule: SvogvCoreModule,
      providers: provider
    };
  }

}
