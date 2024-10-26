import type { FormValue, FormState, FieldPath } from '../types';
import { isTraversable } from '../utils';

/**
 * Whether the form or form field is touched.
 *
 * A form or form field is touched if:
 * * The direct field path has been touched.
 * * Any of its descendant field paths have been touched.
 *
 * @param formState Form state.
 * @param fieldPath (optional) If provided, checks whether the field is touched;
 * otherwise checks the form as a whole.
 */
export function isTouched<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath?: P,
): boolean {
  const { formValue } = formState;
  const { touchedFieldPaths } = formState.__internal.fieldStates;

  if (!fieldPath) {
    return touchedFieldPaths.size > 0;
  }

  if (touchedFieldPaths.has(fieldPath)) {
    return true;
  }

  // No need to check descendants if the value is not an object or array.
  if (isTraversable(formValue)) {
    for (const touchedFieldPath of touchedFieldPaths) {
      if (touchedFieldPath.startsWith(fieldPath)) {
        return true;
      }
    }
  }

  return false;
}
