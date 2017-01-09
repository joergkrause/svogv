import { AcMenuItem } from './ac-menuitem';

/**
 * Base class for menu items.
 */
export class AcMenuDividerItem extends AcMenuItem {
  text: string;
  __name__:string = "AcMenuDividerItem";
  constructor() {
    super("");
  }
}
