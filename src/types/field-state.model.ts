import { Accessor } from 'solid-js';

import { FieldPath } from './field-path.model';
import { FieldValue } from './field-value.model';
import { FormValue } from './form-value.model';

export type FieldState<V extends FormValue, P extends FieldPath<V>> = {
  error: Accessor<string | null>;
  isDisabled: Accessor<boolean>;
  isDirty: Accessor<boolean>;
  isInvalid: Accessor<boolean>;
  isTouched: Accessor<boolean>;

  /**
   * Current value of the field. Equivalent to the value accessible through
   * `props` callback.
   **/
  value: Accessor<FieldValue<V, P>>;
};
