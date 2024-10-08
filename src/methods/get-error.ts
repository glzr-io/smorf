import { FormValue, FormState, FieldPath } from '../types';

/**
 * Get error for a field (if there is one).
 */
export function getError<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): string | null {
  return null;
}
