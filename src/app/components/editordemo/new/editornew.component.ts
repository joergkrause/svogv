// public
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from 'svogv';
// private
import { SiteApiService, EmitterService } from '../../../services';
import { UserViewModel } from '../../../viewmodels';

@Component({
  templateUrl: './editornew.component.html'
})
export class EditorNewComponent implements OnInit {

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
