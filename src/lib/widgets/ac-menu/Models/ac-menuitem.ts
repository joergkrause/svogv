/**
 * Base class for menu items.
 */
export abstract class AcMenuItem {
  /**
   * Visible text in the menu
   */
  text: string;
  /**
   * Optional associated item
   */
  item?: any;
  __name__:string; // a minifier robust type identifier 
  constructor(text: string) {
    this.text = text;
  }
}
