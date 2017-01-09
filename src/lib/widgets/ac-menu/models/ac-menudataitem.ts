import { AcMenuHeaderItem } from './ac-menuheaderitem';

/**
 * A non clickable item in the menu, can provide an icon and a value, that is used to create drop menus.
 */
export class AcMenuLabelItem extends AcMenuHeaderItem {
  __name__ = "AcMenuLabelItem";
  icon: string;
  value: any;
  constructor(text: string, value: any, icon?: string) {
    super(text);
    this.icon = icon;
    this.value = value;
  }
}
