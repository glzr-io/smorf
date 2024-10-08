import type {
  FormValue,
  FieldValue,
  FieldPath,
  FormState,
} from '../types';

/**
 * Get value of form or field value by its path.
 *
 * @example
 * ```typescript
 * const form = createForm({ name: { first: 'bob' } });
 * getValue(form, 'name.first') // 'bob'
 * ```
 */

// Function signature for getting value for form as a whole.
export function getValue<V extends FormValue>(formState: FormState<V>): V;

// Function signature for getting value for form field.
export function getValue<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): FieldValue<V, P>;

// Merged function signature.
export function getValue<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath?: P,
): V | FieldValue<V, P> {
  if (!fieldPath) {
    return formState.value;
  }

  return (
    fieldPath
      // Split on dots and brackets.
      .split(/[\.\[\]]+/)
      // TODO: Avoid type coercion.
      .reduce((r, k) => (r as any)?.[k], formState.value)
  );
}
