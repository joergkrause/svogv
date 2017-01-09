import { AcMenuHeaderItem } from './ac-menuheaderitem';

/**
 * A non clickable item in the menu, can provide an icon.
 */
export class AcMenuLabelItem extends AcMenuHeaderItem {
  __name__ = "AcMenuLabelItem";
  icon: string;
  constructor(text: string, icon?: string) {
    super(text);
    this.icon = icon;
  }
}
