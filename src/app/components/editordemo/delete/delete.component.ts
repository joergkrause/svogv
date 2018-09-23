// public
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidatorService } from 'svogv';
// private
import { SiteApiService, EmitterService } from '../../../services';
import { UserViewModel } from '../../../viewmodels';

@Component({
  templateUrl: './delete.component.html',
  styles: [
    'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
    'legend { padding: 0px 16px 0px 16px; width: auto; }'
  ]
})
export class EditorDeleteComponent implements OnInit, OnDestroy {

  saveResult: boolean;
  userId = 0;
  user: UserViewModel;
  paramsSubscriber: Subscription;

  constructor(private apiService: SiteApiService,
    private route: ActivatedRoute,
    private router: Router,
    private emitterService: EmitterService) {
  }

  ngOnInit() {
    // receive the param on init
    this.paramsSubscriber = this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUser();
    });
  }

  ngOnDestroy() {
    this.paramsSubscriber.unsubscribe();
  }

  // Load a stored query
  loadUser(): void {
    this.apiService
      .getUser(this.userId)
      .subscribe(data => {
        this.user = data;
      });
  }

  // save an item
  deleteItem(): void {
    if (this.userId) {
      this.apiService
        .deleteUser(this.userId)
        .subscribe(result => {
          console.log('Delete User successful');
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
