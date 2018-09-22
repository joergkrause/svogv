// public
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from 'svogv';
// private
import { SiteApiService, EmitterService } from '../../services/index';
import { UserViewModel } from '../../viewmodels/index';
import { emailType } from '../../../node_modules/svogv/services/formvalidator.model';

@Component({
  moduleId: module.id,
  templateUrl: './new.component.html',
  styles: [
    'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
    'legend { padding: 0px 16px 0px 16px; width: auto; }'
  ]
})
export class NewEditorComponent implements OnInit {

  userForm: FormGroup;
  saveResult = false;

  constructor(private apiService: SiteApiService,
              private router: Router,
              private formService: FormValidatorService,
              private emitterService: EmitterService) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type
    this.userForm = this.formService.build(UserViewModel);
    // register changes
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data: any): void {
    // TODO: one may implement autosave here
  }

  // save an item
  saveUser(): void {
    if (this.userForm.valid) {
      this.apiService
        .newUser(this.userForm.value)
        .subscribe(result => {
          console.log('Update User successful');
          // refresh UI
          this.saveResult = result;
          // broadcast that a change has been happend
          this.emitterService.get('BROADCAST').emit();
          this.closeForm();
        });
    }
  }

  closeForm() {
    this.router.navigate(['/editor/list']);
  }

}