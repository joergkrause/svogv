import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { AcMenu } from './models/ac-menu';

@Component({
    selector: 'ac-dropmenu',
    template: `<li class="dropdown messages-menu">
                <!-- Menu toggle button -->
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-envelope-o"></i>
                    <span class="label label-success">{{ label }}</span>
                </a>
                <ul class="dropdown-menu">
                    <li class="header">{{ header }}</li>
                    <li *ngFor="let m in menu.children"></li>
                </ul>
            </li>`})
export class AcDropMenu {
    @Input() menu: AcMenu;

    constructor() {
    }

}