export type HasTargetValue<T> =
  | {
      currentTarget: {
        value: T;
      };
    }
  | {
      target: {
        value: T;
      };
    };

export type ChangeEvent<T> = Event & HasTargetValue<T>;
