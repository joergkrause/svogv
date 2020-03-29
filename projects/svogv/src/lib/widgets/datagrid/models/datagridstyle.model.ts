
export type StyleRules = { [name: string]: string };

/**
 * All styleable parts of the grid.
 */
export interface DatagridStyles {
  first?: StyleRules;
  middle?: StyleRules;
  last?: StyleRules;
  group?: StyleRules;
  header?: StyleRules;
  headerButton?: StyleRules;
  headerSortButton?: StyleRules;
  headerRemoveButton?: StyleRules;
  footer?: StyleRules;
  actionCell?: StyleRules;
}
