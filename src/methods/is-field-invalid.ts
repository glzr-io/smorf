import type { FieldPath, FormState, FormValue } from '../types';
import { isTraversable } from '../utils';

/**
 * Whether the form field is invalid.
 *
 * A form field is invalid if:
 * * The direct field path is invalid.
 * * Any of its descendant field paths are invalid.
 *
 * @param formState Form state.
 * @param fieldPath The field to check for whether it's invalid.
 */
export function isFieldInvalid<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P): boolean {
  const { value: formValue } = formState;
  const { invalidFieldPaths } = formState.__internal.fieldStates;

  if (invalidFieldPaths.has(fieldPath)) {
    return true;
  }

  // No need to check descendants if the value is not an object or array.
  if (isTraversable(formValue)) {
    for (const invalidFieldPath of invalidFieldPaths) {
      if (invalidFieldPath.startsWith(fieldPath)) {
        return true;
      }
    }
  }

  return false;
}
