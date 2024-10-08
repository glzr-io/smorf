import type { FormValue, FieldPath, FormState } from '../types';
import { getDescendantFieldPaths, isTraversable } from '../utils';

export interface SetInvalidOptions {
  /** Whether to set all descendant paths as invalid. Defaults to `false`. */
  deep?: boolean;
}

export function setInvalid<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  options?: SetInvalidOptions,
) {
  const { value } = formState;
  const { invalidFieldPaths } = formState.__internal.fieldStates;

  invalidFieldPaths.add(fieldPath);

  if (options?.deep && isTraversable(value)) {
    for (const descendantPath of getDescendantFieldPaths(value)) {
      invalidFieldPaths.add(descendantPath);
    }
  }
}
