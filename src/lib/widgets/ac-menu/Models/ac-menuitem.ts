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
