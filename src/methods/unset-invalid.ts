import type { FormValue, FieldPath, FormState } from '../types';
import { isTraversable } from '../utils';

export interface UnsetInvalidOptions {
  /** Whether to unset all descendant paths as invalid. Defaults to `false`. */
  deep?: boolean;
}

export function unsetInvalid<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  options?: UnsetInvalidOptions,
) {
  const { value } = formState;
  const { invalidFieldPaths } = formState.__internal.fieldStates;

  invalidFieldPaths.delete(fieldPath);

  if (options?.deep && isTraversable(value)) {
    const descendantPaths = Array.from(invalidFieldPaths.keys()).filter((key) =>
      key.startsWith(fieldPath),
    );

    for (const descendantPath of descendantPaths) {
      invalidFieldPaths.delete(descendantPath);
    }
  }
}
