import type {
  FormValue,
  FieldValue,
  FieldPath,
  FormState,
} from '../types';

/**
 * Get value of field by its path.
 *
 * @example
 * ```typescript
 * const form = createForm({ name: { first: 'bob' } });
 * form.getFieldValue(form, 'name.first') // 'bob'
 * ```
 */
export function getFieldValue<V extends FormValue, P extends FieldPath<V>>(
  formState: FormState<V>,
  fieldPath: P,
): FieldValue<V, P> {
  // TODO: Avoid type coercion.
  return fieldPath
    .split('.')
    .reduce(
      (state, key) => (state as any)?.[key],
      formState.value,
    ) as FieldValue<V, P>;
}
