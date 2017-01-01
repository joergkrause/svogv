/**
 * Describe a header field with name and tooltip.
 */
export class DataGridHeader {
  /**
   * The ctor
   * @param text: Text to display
   * @param desc: Tooltip
   * @param prop: the properties internal name
   */
  constructor(public text: string, public desc: string, public prop: string) {
  }

}

