/**
 * Create a single tab for tab views.
 * The link shall be a regular route array.
 */
export class AcTab {
  /**
   * Ctor to create Tabs definitions
   * @param link: Array of routes or outlet routes
   * @param text: Text shown on tab
   * @param active: Set class for active tab
   * @param disabled: Optionally set the tab inactive
   */
  constructor(public link: Array<string | {}>, public text: string, public active: boolean, public disabled?: boolean) {}
}
