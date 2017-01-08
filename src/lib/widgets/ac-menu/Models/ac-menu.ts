/**
 * Base class for menu items.
 */
export abstract class AcMenuItem {
  text: string;
  __name__:string; // a minifier robust type identifier 
  constructor(text: string) {
    this.text = text;
  }
}

/**
 * A header, not clickable element in the menu
 */
export class AcMenuHeaderItem extends AcMenuItem {
  __name__ = "AcMenuHeaderItem";
  constructor(text: string) {
    super(text);
  }
}

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

/**
 * A regular, clickable element with text and icon.
 */
export class AcMenuLinkItem extends AcMenuLabelItem {
  __name__ = "AcMenuLinkItem";
  link: Array<string>;
  constructor(text: string, link: string[], icon?: string) {
    super(text, icon);
    this.link = link;
  }
}

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
