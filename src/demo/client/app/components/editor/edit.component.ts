// public
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/rx';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormValidatorService } from 'svogv';
// private
import { SiteApiService } from '../../services/siteapiservice';
import { EmitterService } from '../../services/emitterservice';
import { UserViewModel } from '../../viewmodels/userviewmodel';

@Component({
  moduleId: module.id,
  templateUrl: './edit.html',
  styles: [
    'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
    'legend { padding: 0px 16px 0px 16px; width: auto; }'
  ]
})
export class EditEditorComponent implements OnInit {

  userForm: FormGroup;
  saveResult: boolean;
  userId = 0;
  user: UserViewModel;
  paramsSubscriber: Subscription;

  constructor(private apiService: SiteApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormValidatorService) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type     
    this.userForm = this.formService.build(UserViewModel);
    // register changes
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // receive the param on init
    this.paramsSubscriber = this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  onValueChanged(data: any): void {
    // TODO: one may implement autosave here
  }

  ngOnDestroy() {
    this.paramsSubscriber.unsubscribe();
  }

  // Load a stored query
  loadUser(): void {
    this.apiService
      .getUser(this.userId)
      .subscribe(data => {
        // patchValue here instead if setValue because the form's 
        // viewmodel is more complete than the form
        this.userForm.patchValue(data, { onlySelf: true, emitEvent: false });
      });
  }

  // save an item
  saveUser(): void {
    if (this.userForm.valid) {
      this.apiService
        .editUser(this.userId, this.userForm.value)
        .subscribe(result => {
          console.log('Update User successful');
          // refresh UI
          this.saveResult = result;
          // broadcast that a change has been happend
          EmitterService.get('BROADCAST').emit();
          this.closeForm();
        });
    }
  }

  closeForm() {
    this.router.navigate(['/editor/list']);
  }


}