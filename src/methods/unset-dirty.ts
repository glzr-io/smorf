import type { FormValue, FieldPath, FormState } from '../types';
import { isTraversable } from '../utils';

export interface UnsetDirtyOptions {
  /** Whether to unset all descendant paths as dirty. Defaults to `false`. */
  deep?: boolean;
}

export function unsetDirty<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  options?: UnsetDirtyOptions,
) {
  const { value } = formState;
  const { dirtyFieldPaths } = formState.__internal.fieldStates;

  dirtyFieldPaths.delete(fieldPath);

  if (options?.deep && isTraversable(value)) {
    const descendantPaths = Array.from(dirtyFieldPaths.keys()).filter((key) =>
      key.startsWith(fieldPath),
    );

    for (const descendantPath of descendantPaths) {
      dirtyFieldPaths.delete(descendantPath);
    }
  }
}
