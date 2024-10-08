import type { Paths } from 'type-fest';
import type { ToString } from 'type-fest/source/internal';

import type { FormValue } from './form-value.model';

/**
 * Union of all field paths in a form.
 *
 * @example
 * ```typescript
 * FieldPath<{ lorem: { ipsum: 1 }}> // 'lorem' | 'lorem.ipsum'
 * ```
 */
export type FieldPath<V extends FormValue> = ToString<Paths<V>>;
