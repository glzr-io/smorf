import type { FormValue, FormState } from '../types';

/**
 * Validate the form value.
 *
 * @param formState - The form state.
 * @returns `true` if the form value is valid, `false` otherwise.
 */
export function validate<V extends FormValue>(
  formState: FormState<V>,
): boolean {
  const { value: formValue } = formState;
  const { options, fieldStates } = formState.__internal;

  if (!options?.schema) {
    return true;
  }

  const result = options.schema.safeParse(formValue);

  // Clear existing errors.
  fieldStates.errorFieldPaths.clear();

  // Aggregate errors by field path. A single field can have multiple
  // errors.
  for (const error of result.error?.errors ?? []) {
    const errorPath = error.path.join('.');

    const existingErrors =
      fieldStates.errorFieldPaths.get(errorPath) ?? [];

    fieldStates.errorFieldPaths.set(errorPath, [
      ...existingErrors,
      error.message,
    ]);
  }

  return result.success;
}
