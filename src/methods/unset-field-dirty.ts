import type { FormValue, FieldPath, FormState } from '../types';
import { isTraversable } from '../utils';

export interface UnsetFieldDirtyOpts {
  /** Whether to unset all descendant paths as dirty. Defaults to `false`. */
  deep?: boolean;
}

export function unsetFieldDirty<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P, options?: UnsetFieldDirtyOpts) {
  const { value: formValue } = formState;
  const { dirtyFieldPaths } = formState.__internal.fieldStates;

  dirtyFieldPaths.delete(fieldPath);

  if (options?.deep && isTraversable(formValue)) {
    const descendantPaths = Array.from(dirtyFieldPaths.keys()).filter(
      key => key.startsWith(fieldPath),
    );

    for (const descendantPath of descendantPaths) {
      dirtyFieldPaths.delete(descendantPath);
    }
  }
}
