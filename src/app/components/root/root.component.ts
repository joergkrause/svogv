import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent {

  currentYear: string;

  constructor() {
    this.currentYear = new Date().getFullYear().toString();
  }

}
