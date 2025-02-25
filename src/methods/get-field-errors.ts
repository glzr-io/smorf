import type { FormValue, FormState, FieldPath } from '../types';

/**
 * Get all errors for a field.
 */
export function getFieldErrors<
  V extends FormValue,
  P extends FieldPath<V>,
>(formState: FormState<V>, fieldPath: P): string[] {
  const { errorFieldPaths } = formState.__internal.fieldStates;

  if (errorFieldPaths.has(fieldPath)) {
    return errorFieldPaths.get(fieldPath) ?? [];
  }

  for (const [errorFieldPath, errors] of errorFieldPaths) {
    if (errorFieldPath.startsWith(fieldPath)) {
      return errors;
    }
  }

  return [];
}
