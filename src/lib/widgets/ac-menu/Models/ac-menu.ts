import { AcMenuItem } from './ac-menuitem';

/**
 * The menu container, can provide a recursive list of menu items.
 */
export class AcMenu {
  public children: Array<AcMenuItem>

  constructor(...items: Array<AcMenuItem>) {
    this.children = items;
  }

  // Get the item and return null if not of expected subtype, or text not unique, or not found.
  getMenuItem<T extends AcMenuItem>(name: string): T {
    let foundItems = this.children.filter(item => item.text === name);
    if (foundItems.length === 1) return foundItems[0] as T;
    return null;
  };

}
