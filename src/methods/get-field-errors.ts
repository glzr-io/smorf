import type { FormValue, FormState, FieldPath } from '../types';
import { isTraversable } from '../utils';

/**
 * Get all errors for a field.
 */
export function getFieldErrors<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P): string[] {
  const { value: formValue } = formState;
  const { errorFieldPaths } = formState.__internal.fieldStates;

  if (errorFieldPaths.has(fieldPath)) {
    return errorFieldPaths.get(fieldPath) ?? [];
  }

  // No need to check descendants if the value is not an object or array.
  if (isTraversable(formValue)) {
    for (const [errorFieldPath, errors] of errorFieldPaths) {
      if (errorFieldPath.startsWith(fieldPath)) {
        return errors;
      }
    }
  }

  return [];
}
