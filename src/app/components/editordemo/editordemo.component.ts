// public
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { FormValidatorService } from 'svogv';
// private
import { SiteApiService, EmitterService } from '../../services';
import { UserViewModel } from '../../viewmodels';

@Component({
  templateUrl: './editordemo.component.html',
  styles: [
    'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
    'legend { padding: 0px 16px 0px 16px; width: auto; }'
  ]
})
export class EditorDemoComponent implements OnInit, OnDestroy {

  userForm: NgForm;
  userFormGroup: FormGroup;
  saveResult: boolean;
  userId = 0;
  user: UserViewModel;
  paramsSubscriber: Subscription;

  constructor(private apiService: SiteApiService,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormValidatorService,
    private emitterService: EmitterService) {
  }

  ngOnInit() {
    // get validators and error messages from viewmodel type
    this.userFormGroup = this.formService.build(UserViewModel);
    // register changes
    this.userFormGroup.valueChanges.subscribe(data => this.onValueChanged(data));
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
        this.userFormGroup.patchValue(data, { onlySelf: true, emitEvent: false });
      });
  }

  // save an item
  saveUser(): void {
    if (this.userFormGroup.valid) {
      this.apiService
        .editUser(this.userId, this.userFormGroup.value)
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
