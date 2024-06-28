import { NumberCell, numberCellTester } from './number';
import { StringCell, stringCellTester } from './string';

export const cells = [
  {
    tester: stringCellTester,
    cell: StringCell,
  },
  {
    tester: numberCellTester,
    cell: NumberCell,
  },
];
