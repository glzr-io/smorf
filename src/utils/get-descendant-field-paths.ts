import { isTraversable } from './is-traversable';

export function getDescendantFieldPaths(
  value: unknown | unknown[],
  previousPath = '',
): string[] {
  return Object.keys(value ?? {}).reduce((acc, keyOrIndex) => {
    const descendantPath = previousPath
      ? `${previousPath}.${keyOrIndex}`
      : keyOrIndex;

    // Type coercion is needed here to allow accessing `value` by string index.
    const descendantValue = (value as { [index: string]: unknown })[
      keyOrIndex
    ];

    if (isTraversable(descendantValue)) {
      return acc
        .concat(descendantPath)
        .concat(getDescendantFieldPaths(descendantValue, descendantPath));
    }

    return acc.concat(descendantPath);
  }, [] as string[]);
}
