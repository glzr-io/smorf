import type { FormValue, FieldPath, FormState } from '../types';
import { isTraversable } from '../utils';

export interface UnsetFieldTouchedOpts {
  /** Whether to unset all descendant paths as touched. Defaults to `false`. */
  deep?: boolean;
}

export function unsetFieldTouched<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P, options?: UnsetFieldTouchedOpts) {
  const { value: formValue } = formState;
  const { touchedFieldPaths } = formState.__internal.fieldStates;

  touchedFieldPaths.delete(fieldPath);

  if (options?.deep && isTraversable(formValue)) {
    const descendantPaths = Array.from(touchedFieldPaths.keys()).filter(
      key => key.startsWith(fieldPath),
    );

    for (const descendantPath of descendantPaths) {
      touchedFieldPaths.delete(descendantPath);
    }
  }
}
