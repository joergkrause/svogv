import { AcTab } from './actab.model';

/**
 * A collection of tabs used to create a tabbed view.
 * The tabs' content is pulled from routes / child routes.
 */
export class AcTabData {
  constructor(items: Array<AcTab>) {
    this.tabs = items;
  }

  tabs: Array<AcTab>;
}
