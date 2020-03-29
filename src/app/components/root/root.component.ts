import { Component } from '@angular/core';
import { SiteApiService, EmitterService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styles: [
    'footer { position: fixed; bottom: 15px; }'
  ]
})
export class RootComponent {

  currentYear: string;

  constructor() {
    this.currentYear = new Date().getFullYear().toString();
  }

}
