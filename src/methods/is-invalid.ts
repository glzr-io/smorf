import type { FieldPath, FormState, FormValue } from '../types';
import { isTraversable } from '../utils';

/**
 * Whether the form or form field is invalid.
 *
 * A form or form field is invalid if:
 * * The direct field path is invalid.
 * * Any of its descendant field paths are invalid.
 *
 * @param formState Form state.
 * @param fieldPath (optional) If provided, checks whether the field is invalid;
 * otherwise checks the form as a whole.
 */
export function isInvalid<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath?: P,
): boolean {
  const { value } = formState;
  const { invalidFieldPaths } = formState.__internal.fieldStates;

  if (!fieldPath) {
    return invalidFieldPaths.size > 0;
  }

  if (invalidFieldPaths.has(fieldPath)) {
    return true;
  }

  // No need to check descendants if the value is not an object or array.
  if (isTraversable(value)) {
    for (const invalidFieldPath of invalidFieldPaths) {
      if (invalidFieldPath.startsWith(fieldPath)) {
        return true;
      }
    }
  }

  return false;
}
