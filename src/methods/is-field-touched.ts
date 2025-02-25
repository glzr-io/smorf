import type { FormValue, FormState, FieldPath } from '../types';

/**
 * Whether the form field is touched.
 *
 * A form field is touched if:
 * * The direct field path has been touched.
 * * Any of its descendant field paths have been touched.
 *
 * @param formState Form state.
 * @param fieldPath The field to check for whether it's touched.
 */
export function isFieldTouched<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P): boolean {
  const { touchedFieldPaths } = formState.__internal.fieldStates;

  if (touchedFieldPaths.has(fieldPath)) {
    return true;
  }

  for (const touchedFieldPath of touchedFieldPaths) {
    if (touchedFieldPath.startsWith(fieldPath)) {
      return true;
    }
  }

  return false;
}
