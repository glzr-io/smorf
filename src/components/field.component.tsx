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
  getError,
  getValue,
  isDirty,
  isDisabled,
  isInvalid,
  isTouched,
} from '../methods';

/** Extract value from `onChange` callback data. */
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
    fieldState: FieldState<V, P>,
    props: Accessor<{
      value: T;
      onBlur: (event?: Event) => void;
      onChange: (eventOrValue: ChangeEvent<T> | T) => void;
    }>,
  ) => JSXElement;
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
    error: createMemo(() => getError(formState, fieldPath)),
    isDisabled: createMemo(() => isDisabled(formState, fieldPath)),
    isDirty: createMemo(() => isDirty(formState, fieldPath)),
    isInvalid: createMemo(() => isInvalid(formState, fieldPath)),
    isTouched: createMemo(() => isTouched(formState, fieldPath)),
    value: createMemo(() => getValue(formState, fieldPath)),
  };

  const fieldProps = createMemo(() => {
    const value = getValue(formState, fieldPath);

    // Transform incoming value if there is a transform function.
    const incomingValue = transform?.in ? transform.in(value) : value;

    return {
      value: incomingValue,
      onBlur: () => formState.setTouched(fieldPath),
      onChange: (eventOrValue: ChangeEvent<T> | T) => {
        const value = getChangeValue(eventOrValue);

        // Transform outgoing value if there is a transform function.
        const outgoingValue = transform?.out
          ? transform.out(value)
          : (value as FieldValue<V, P>);

        formState.setValue(fieldPath, outgoingValue);
        formState.setDirty(fieldPath);
      },
    };
  });

  return props.children(fieldState, fieldProps);
}
