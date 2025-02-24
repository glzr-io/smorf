import { type Accessor, type JSXElement, createMemo } from 'solid-js';

import type {
  ChangeEvent,
  FieldPath,
  FieldState,
  FieldValue,
  FormState,
  FormValue,
  HasTargetValue,
  NestedFormValue,
} from '../types';
import {
  getFieldError,
  getFieldErrors,
  getFieldValue,
  isFieldDirty,
  hasFieldError,
  isFieldTouched,
} from '../methods';

/**
 * Extracts value from `onChange` callback data.
 */
function getChangeValue<T extends NestedFormValue>(
  eventOrValue: ChangeEvent<T> | T,
) {
  if (!(eventOrValue instanceof Event)) {
    return eventOrValue;
  }

  const event = eventOrValue as HasTargetValue<T>;

  if ('target' in event) {
    return event.target.value;
  }

  return event.currentTarget.value;
}

export type TransformFn<V, T extends NestedFormValue> = (val: V) => T;

export interface FieldProps<
  V extends FormValue,
  P extends FieldPath<V>,
  T extends NestedFormValue = FieldValue<V, P>,
> {
  /** {@link FormState} that this field belongs to. */
  of: FormState<V>;

  /** Field path. */
  path: P;

  /** Transform the incoming & outgoing values passed to the `children` callback. */
  transform?: {
    in: TransformFn<FieldValue<V, P>, T>;
    out: (value: T) => FieldValue<V, P>;
  };

  /** Template function for children. */
  children: (
    props: Accessor<{
      value: T;
      onBlur: (event?: Event) => void;
      onChange: (eventOrValue: ChangeEvent<T> | T) => void;
    }>,
    fieldState: FieldState<V, P>,
  ) => JSXElement;

  /**
   * When to validate the field.
   *
   * @default 'change'
   */
  validateOn?: 'blur' | 'change' | 'change-after-blur' | 'never';
}

export function Field<
  V extends FormValue,
  P extends FieldPath<V>,
  T extends NestedFormValue = FieldValue<V, P>,
>(props: FieldProps<V, P, T>) {
  const formState = props.of;
  const fieldPath = props.path;
  const transform = props.transform;

  const fieldState = {
    error: createMemo(() => getFieldError(formState, fieldPath)),
    errors: createMemo(() => getFieldErrors(formState, fieldPath)),
    isDirty: createMemo(() => isFieldDirty(formState, fieldPath)),
    hasError: createMemo(() => hasFieldError(formState, fieldPath)),
    isTouched: createMemo(() => isFieldTouched(formState, fieldPath)),
    value: createMemo(() => getFieldValue(formState, fieldPath)),
  };

  const fieldProps = createMemo(() => {
    const value = getFieldValue(formState, fieldPath);

    // Transform incoming value if there is a transform function.
    const incomingValue = transform?.in ? transform.in(value) : value;

    const validateOn =
      props.validateOn ??
      formState.__internal.options?.validateOn ??
      'change';

    return {
      value: incomingValue as T,
      onBlur: () => {
        formState.setFieldTouched(fieldPath);

        if (validateOn === 'blur') {
          formState.validateField(fieldPath);
        }
      },
      onChange: (eventOrValue: ChangeEvent<T> | T) => {
        const value = getChangeValue(eventOrValue);

        // Transform outgoing value if there is a transform function.
        const outgoingValue = transform?.out
          ? transform.out(value)
          : (value as FieldValue<V, P>);

        formState.setFieldValue(fieldPath, outgoingValue);
        formState.setFieldDirty(fieldPath);

        if (validateOn === 'change') {
          formState.validateField(fieldPath);
        }

        if (validateOn === 'change-after-blur' && fieldState.isTouched()) {
          formState.validateField(fieldPath);
        }
      },
    };
  });

  return props.children(fieldProps, fieldState);
}
