import type { FieldPath, FormState, FormValue } from '../types';
import { getFieldError } from './get-field-error';

/**
 * Whether the form field has an error.
 *
 * A form field has an error if:
 * * The direct field path has an error.
 * * Any of its descendant field paths have an error.
 *
 * @param formState Form state.
 * @param fieldPath The field to check for whether it has an error.
 */
export function hasFieldError<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): boolean {
  return getFieldError(formState, fieldPath) !== null;
}
