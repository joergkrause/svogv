import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HudClock, HudClockOptions } from 'svogv';

/**
 * Dashboard to demonstrate HUD components.
 */
@Component({
  moduleId: module.id,
  selector: 'hud-dashboard',
  templateUrl: './hud-dashboard.html',
  styles: ['#hudDemo { background-color: #000; }']
})
export class HudDashboardComponent {

  @ViewChild('hudClock') hudClock: HudClock;
  public configForm: FormGroup;
  private initalConfig: HudClockOptions; 

  constructor() {
    this.initalConfig = {
            width: 200,
            height: 200,
            starCount: 500,
            showBottomTime: true,
            drawDigital: true,
            star: {
                minOpacity: 0.1,
                fade: true,
                fadeSpeed: 0.02,
                color: '#0a0'
            },
            hour: {
                foreground: '#aaa',
                background: '#000',
                width: 3,
            },
            minute: {
                foreground: '#abc',
                background: '#000',
                width: 3,
            },
            second: {
                foreground: '#aaa',
                background: '#000',
                width: 3,
            },
            milli: {
                foreground: 'rgba(0,0,0,0.1)',
                background: '#000',
                width: 3,
            }
        };
    this.configForm = new FormGroup({
      starCount: new FormControl()
    });
    this.configForm.valueChanges.subscribe(()=> {
        let newConfig = this.initalConfig;
        newConfig.starCount = this.configForm.controls['starCount'].value;
        this.hudClock.config.emit(newConfig);
    });
  }



}
