import { Component, OnInit } from '@angular/core';
import { SiteApiService, EmitterService } from '../../services';
import { UserViewModelList } from '../../viewmodels';

/**
 * Dashboard shows global data. The data are retrieved in the root and broadcastet,
 * the broadcaster can use redux to store as state.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  users: Array<UserViewModelList> = [];

  constructor(private apiService: SiteApiService, private emitterService: EmitterService) {
    // raw data for tiles
    this.emitterService.get('BROADCAST_Users').subscribe(data => {
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
