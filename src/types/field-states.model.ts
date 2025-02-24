export interface FieldStates {
  dirtyFieldPaths: Set<string>;
  touchedFieldPaths: Set<string>;
  errorFieldPaths: Map<string, string[]>;
}
