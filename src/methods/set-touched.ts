import { FormValue, FieldPath, FormState } from '../types';
import { getDescendantFieldPaths, isTraversable } from '../utils';

export interface SetTouchedOptions {
  /** Whether to set all descendant paths as touched. Defaults to `false`. */
  deep?: boolean;
}

export function setTouched<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  options?: SetTouchedOptions,
) {
  const { value } = formState;
  const { touchedFieldPaths } = formState.__internal.fieldStates;

  touchedFieldPaths.add(fieldPath);

  if (options?.deep && isTraversable(value)) {
    for (const descendantPath of getDescendantFieldPaths(value)) {
      touchedFieldPaths.add(descendantPath);
    }
  }
}
