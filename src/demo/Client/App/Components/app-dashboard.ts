import { Component } from '@angular/core';
import { EmitterService } from '../Services/EmitterService';
import { SiteApiService } from '../Services/SiteApiService';
import { UserViewModel } from '../ViewModels/UserViewModel';

/**
 * Dashboard shows global data. The data are retrieved in the root and broadcastet, the broadcaster can use redux to store as state.
 */
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.html'
})
export class DashboardComponent {

  users: Array<UserViewModel> = [];

  constructor(private apiService: SiteApiService) {
    // raw data for tiles
    EmitterService.get("BROADCAST_Users").subscribe(data => {
      console.log("Dashboard received BROADCAST_Users event");
      this.users = data;
    });
  }

  ngOnInit() {
    console.log("Dashboard initializing");
    // retrieve fresh data on init, independently of the broadcast
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }


}