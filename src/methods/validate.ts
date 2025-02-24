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

  for (const error of result.error?.errors ?? []) {
    fieldStates.errorFieldPaths.set(error.path.join('.'), error.message);
  }

  return result.success;
}
