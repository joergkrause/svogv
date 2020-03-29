import { Component, Input } from '@angular/core';
import { AcMenu } from './models/ac-menu';

@Component({
  selector: 'app-sidemenu',
  styles: ['.headerItem { margin-left: 32px }',
    '.linkItem { margin-right: 5px }',
    '.sideMenuCanvas { padding: 15px; }'],
  templateUrl: 'sidemenu.component.html'
})
export class SideMenuComponent {

  /**
   * The menu's data.
   */
  @Input() public menu: AcMenu;
  /**
   * Format links so they use [routerlink] syntax. Default is true.
   */
  @Input() public useRouterLinks = true;

  // tslint:disable-next-line:no-unused-variable
  public itemType(item: any): string {
    if (item === undefined || item === null) {
      throw new Error('The reflection metadata could not be found.');
    }
    const itemType: string = item['__name__'];
    return itemType;
  }

}
