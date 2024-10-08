export interface FieldStates {
  dirtyFieldPaths: Set<string>;
  touchedFieldPaths: Set<string>;
  disabledFieldPaths: Set<string>;
  invalidFieldPaths: Set<string>;
}
