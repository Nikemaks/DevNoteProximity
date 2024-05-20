/**
 * Sorts an array of objects by a specified field.
 *
 * @param {T[]} array - The array of objects to be sorted.
 * @param {keyof T} field - The field by which to sort the objects.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. Default is true.
 * @returns {T[]} - The sorted array.
 */
export function sortByField<T>(
  array: T[],
  field: keyof T,
  ascending: boolean = true
): T[] {
  if (!Array.isArray(array)) {
    throw new Error('First argument should be an array');
  }

  return array.sort((a, b) => {
    const aField = a[field];
    const bField = b[field];

    if (aField == null && bField == null) {
      return 0;
    }
    if (aField == null) {
      return ascending ? -1 : 1;
    }
    if (bField == null) {
      return ascending ? 1 : -1;
    }

    if (aField < bField) {
      return ascending ? -1 : 1;
    }
    if (aField > bField) {
      return ascending ? 1 : -1;
    }
    return 0;
  });
}
