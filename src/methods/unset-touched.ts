import type { FormValue, FieldPath, FormState } from '../types';
import { isTraversable } from '../utils';

export interface UnsetTouchedOptions {
  /** Whether to unset all descendant paths as touched. Defaults to `false`. */
  deep?: boolean;
}

export function unsetTouched<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
  options?: UnsetTouchedOptions,
) {
  const { value } = formState;
  const { touchedFieldPaths } = formState.__internal.fieldStates;

  touchedFieldPaths.delete(fieldPath);

  if (options?.deep && isTraversable(value)) {
    const descendantPaths = Array.from(touchedFieldPaths.keys()).filter((key) =>
      key.startsWith(fieldPath),
    );

    for (const descendantPath of descendantPaths) {
      touchedFieldPaths.delete(descendantPath);
    }
  }
}
