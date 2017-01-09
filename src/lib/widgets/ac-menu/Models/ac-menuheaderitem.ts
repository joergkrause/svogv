import { AcMenuItem } from './ac-menuitem';

/**
 * A header, not clickable element in the menu
 */
export class AcMenuHeaderItem extends AcMenuItem {
  __name__ = "AcMenuHeaderItem";
  constructor(text: string) {
    super(text);
  }
}
