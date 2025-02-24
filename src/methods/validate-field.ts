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

  const result = options.schema.safeParse(formValue, {
    path: fieldPath.split('.'),
  });

  // Clear existing errors.
  fieldStates.errorFieldPaths.delete(fieldPath);

  // Aggregate errors by field path. A single field can have multiple
  // errors.
  for (const error of result.error?.errors ?? []) {
    const fieldPath = error.path.join('.');

    const existingErrors =
      fieldStates.errorFieldPaths.get(fieldPath) ?? [];

    fieldStates.errorFieldPaths.set(fieldPath, [
      ...existingErrors,
      error.message,
    ]);
  }

  return result.success;
}
