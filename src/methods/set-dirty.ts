import type { FormValue, FieldPath, FormState } from '../types';
import { isTraversable, getDescendantFieldPaths } from '../utils';

export interface SetDirtyOptions {
  /** Whether to set all descendant paths as dirty. Defaults to `false`. */
  deep?: boolean;
}

export function setDirty<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  options?: SetDirtyOptions,
) {
  const { value } = formState;
  const { dirtyFieldPaths } = formState.__internal.fieldStates;

  dirtyFieldPaths.add(fieldPath);

  if (options?.deep && isTraversable(value)) {
    for (const descendantPath of getDescendantFieldPaths(value)) {
      dirtyFieldPaths.add(descendantPath);
    }
  }
}
