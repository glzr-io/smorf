import type { FormValue, FieldPath, FormState } from '../types';
import { getDescendantFieldPaths, isTraversable } from '../utils';

export interface SetFieldTouchedOpts {
  /** Whether to set all descendant paths as touched. Defaults to `false`. */
  deep?: boolean;
}

export function setFieldTouched<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P, options?: SetFieldTouchedOpts) {
  const { value: formValue } = formState;
  const { touchedFieldPaths } = formState.__internal.fieldStates;

  touchedFieldPaths.add(fieldPath);

  if (options?.deep && isTraversable(formValue)) {
    for (const descendantPath of getDescendantFieldPaths(formValue)) {
      touchedFieldPaths.add(descendantPath);
    }
  }
}
