/**
 * Get an array of ancestor field paths (does not include self).
 *
 * @example
 * ```typescript
 * getAncestorFieldPaths('some.nested.key') // ['some', 'some.nested']
 * ```
 */
export function getAncestorFieldPaths(fieldPath: string) {
  // Get array of paths (e.g. ['some', 'nested', 'key']).
  const splitFieldPath = fieldPath.split('.');

  return splitFieldPath.reduce((acc, _, index) => {
    // Exclude final path, otherwise 'some.nested.key' will get included.
    if (index === splitFieldPath.length - 1) {
      return acc;
    }

    const ancestorPath = splitFieldPath.slice(0, index + 1).join('.');

    return [...acc, ancestorPath];
  }, [] as string[]);
}
