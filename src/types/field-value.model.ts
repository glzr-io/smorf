import type { FormValue } from './form-value.model';
import type { FieldPath } from './field-path.model';

type Idx<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? number extends keyof T
      ? T[number]
      : never
    : never;

/**
 * Gets the value at the stringified path to a key.
 *
 * Ref: https://stackoverflow.com/a/71097605/9139929
 */
type DeepIndex<T, K extends string> = T extends object
  ? K extends `${infer F}.${infer R}`
    ? DeepIndex<Idx<T, F>, R>
    : Idx<T, K>
  : never;

/**
 * Type representing the value at given field path.

 * @example
 * ```typescript
 * FieldValue<{ first: { name: 'homer' } }, 'first.name'>; // 'homer'
 * ```
 */
export type FieldValue<
  V extends FormValue,
  P extends FieldPath<V>,
> = DeepIndex<V, P>;
