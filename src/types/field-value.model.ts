import type { Call, Objects } from 'hotscript';

import type { FormValue } from './form-value.model';
import type { FieldPath } from './field-path.model';

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
