
export type StyleRules = { [name: string]: string };

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
