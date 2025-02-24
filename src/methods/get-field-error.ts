import type { FormValue, FormState, FieldPath } from '../types';
import { isTraversable } from '../utils';

/**
 * Get error for a field (if there is one).
 */
export function getFieldError<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): string | null {
  const { value: formValue } = formState;
  const { errorFieldPaths } = formState.__internal.fieldStates;

  if (errorFieldPaths.has(fieldPath)) {
    return errorFieldPaths.get(fieldPath) ?? null;
  }

  // No need to check descendants if the value is not an object or array.
  if (isTraversable(formValue)) {
    for (const [errorFieldPath, error] of errorFieldPaths) {
      if (errorFieldPath.startsWith(fieldPath)) {
        return error;
      }
    }
  }

  return null;
}
