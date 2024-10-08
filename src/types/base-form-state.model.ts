import type { FieldStates } from './field-states.model';
import type { FormValue } from './form-value.model';

export interface BaseFormState<V extends FormValue> {
  /**
   * Form value.
   */
  value: V;

  __internal: {
    /**
     * State of the form fields (eg. disabled, touched, etc.).
     *
     * @internal
     */
    fieldStates: FieldStates;

    /**
     * Update states of form fields (eg. disabled, touched, etc.).
     *
     * @internal
     */
    setFieldStates: (fieldStates: FieldStates) => void;

    /**
     * Update form value.
     *
     * @internal
     */
    setFormValue: (value: V) => void;
  };
}
