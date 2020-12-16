import { Component, Input, Output } from '@angular/core';

export type tabsSelectable = 'info' | 'code' | 'demo';

@Component({
  selector: 'app-minitabs',
  templateUrl: './minitabs.component.html',
  styleUrls: ['./minitabs.component.css']
})
export class MinitabsComponent {

  @Input()
  @Output()
  public tabSelected: tabsSelectable = 'info';

}
