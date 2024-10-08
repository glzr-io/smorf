import type { Call, Objects } from 'hotscript';

import type { FormValue } from './form-value.model';

/**
 * Union of all field paths in a form.
 *
 * @example
 * ```typescript
 * FieldPath<{ lorem: { ipsum: 1 }}> // 'lorem' | 'lorem.ipsum'
 * ```
 */
export type FieldPath<V extends FormValue> = Call<Objects.AllPaths, V>;
