import { Pipe } from '@angular/core';

/**
 * Describe a header field with name, tooltip and other properties.
 */
export class DataGridHeaderModel {
  /**
   * The ctor
   * @param text: The text to display.
   * @param desc: A tooltip that is shown on mouseover (using the `title` attribute).
   * @param prop: The propertie's internal name.
   * @param hidden: optionally set a field as hidden and hence do not show in the grid.
   */
  constructor(public text: string, public desc: string, public prop: string, public hidden: boolean = false) {
    this.isSortable = true;
    this.templateHint = 'text';
  }

  /**
   * Hint from view model to select a certain template. Default is *text* (format as string).
   */
  templateHint: string;

  /**
   * Additional parameters some templates may use. Optional.
   */
  templateHintParams?: any[];

  /**
   * Display the sort buttons and connect to sort functions. Default is `true`.
   */
  isSortable: boolean;

  /**
   * Provides a pipe for all data of this column. Default is no pipe (`undefined`).
   */
  pipe: Pipe;

  /**
   * Optional parameters for a pipe.
   */
  pipeParams?: any[];

}

