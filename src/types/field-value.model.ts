import { Call, Objects } from 'hotscript';

import { FormValue } from './form-value.model';
import { FieldPath } from './field-path.model';

/**
 * Type representing the value at given field path.

 * @example
 * ```typescript
 * FieldValue<{ first: { name: 'homer' } }, 'first.name'>; // 'homer'
 * ```
 */
export type FieldValue<V extends FormValue, P extends FieldPath<V>> = Call<
  Objects.Get<P>,
  V
>;
