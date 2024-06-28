import { Input } from '#/components/ui/input';
import { cn } from '#/lib/classnames';
import { RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { withVanillaCellProps } from '@jsonforms/vanilla-renderers';

export const NumberCell = withJsonFormsCellProps(
  withVanillaCellProps((props) => {
    const { data, enabled, path, handleChange } = props;

    return (
      <Input
        type="number"
        className="text-base"
        value={data || ''}
        onChange={(ev) => handleChange(path, ev.target.value === '' ? undefined : ev.target.valueAsNumber)}
        disabled={!enabled}
      />
    );
  })
);

export const number_cell_type = 'number_cell_type';

export const numberCellTester: RankedTester = rankWith(1, uiTypeIs(number_cell_type));
