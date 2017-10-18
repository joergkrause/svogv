import { Component } from '@angular/core';
import { SiteApiService, EmitterService } from '../services/index';
import { UserViewModel } from '../viewmodels/index';

/**
 * Dashboard shows global data. The data are retrieved in the root and broadcastet,
 * the broadcaster can use redux to store as state.
 */
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html'
})
export class DashboardComponent {

  users: Array<UserViewModel> = [];

  constructor(private apiService: SiteApiService) {
    // raw data for tiles
    EmitterService.get('BROADCAST_Users').subscribe(data => {
      console.log('Dashboard received BROADCAST_Users event');
      this.users = data;
    });
  }

  ngOnInit() {
    console.log('Dashboard initializing');
    // retrieve fresh data on init, independently of the broadcast
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
