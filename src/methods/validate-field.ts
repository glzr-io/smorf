import type { FormValue, FormState, FieldPath } from '../types';

/**
 * Validate the form field value.
 *
 * @param formState - The form state.
 * @param fieldPath - The field path to validate.
 * @returns `true` if the form field value is valid, `false` otherwise.
 */
export function validateField<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): boolean {
  const { value: formValue } = formState;
  const { options, fieldStates } = formState.__internal;

  if (!options?.schema) {
    return true;
  }

  const result = options.schema.safeParse(formValue);

  // Clear existing errors.
  for (const [errorFieldPath] of fieldStates.errorFieldPaths) {
    if (errorFieldPath.startsWith(fieldPath)) {
      fieldStates.errorFieldPaths.delete(errorFieldPath);
    }
  }

  // Add errors for only the given field path.
  for (const error of result.error?.errors ?? []) {
    const errorPath = error.path.join('.');

    // Allow errors for descendant paths.
    if (errorPath.startsWith(fieldPath)) {
      const existingErrors =
        fieldStates.errorFieldPaths.get(errorPath) ?? [];

      fieldStates.errorFieldPaths.set(errorPath, [
        ...existingErrors,
        error.message,
      ]);
    }
  }

  return result.success;
}
