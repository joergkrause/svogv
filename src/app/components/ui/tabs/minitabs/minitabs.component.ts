import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-minitabs',
  templateUrl: './minitabs.component.html',
  styleUrls: ['./minitabs.component.css']
})
export class MinitabsComponent implements OnInit {

  @Input()
  @Output()
  tabSelected: string = 'info';

  constructor() { }

  ngOnInit() {
  }

}
