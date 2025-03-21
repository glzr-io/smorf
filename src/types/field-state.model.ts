import type { Accessor } from 'solid-js';

import type { FieldPath } from './field-path.model';
import type { FieldValue } from './field-value.model';
import type { FormValue } from './form-value.model';

export type FieldState<V extends FormValue, P extends FieldPath<V>> = {
  error: Accessor<string | null>;
  errors: Accessor<string[]>;
  isDirty: Accessor<boolean>;
  hasError: Accessor<boolean>;
  isTouched: Accessor<boolean>;

  /**
   * Current value of the field. Equivalent to the value accessible through
   * `props` callback.
   **/
  value: Accessor<FieldValue<V, P>>;
};
