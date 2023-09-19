import { IBook } from '@/types/globalTypes';

export function getUniqueValuesByProp(
  arr: IBook[] = [],
  prop: keyof Omit<IBook, 'reviews' | '_id' | 'id'>
): string[] {
  const uniqueValues = new Set<string>();

  arr.forEach((book) => {
    const value = book[prop];
    if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return [...uniqueValues];
}
