import type { FormValue, FormState, FieldPath } from '../types';

/**
 * Get the first error for a field (if there is one).
 */
export function getFieldError<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): string | null {
  const { errorFieldPaths } = formState.__internal.fieldStates;

  if (errorFieldPaths.has(fieldPath)) {
    return errorFieldPaths.get(fieldPath)?.[0] ?? null;
  }

  for (const [errorFieldPath, errors] of errorFieldPaths) {
    if (errorFieldPath.startsWith(fieldPath)) {
      return errors[0] ?? null;
    }
  }

  return null;
}
