import { Input } from '#/components/ui/input';
import { RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { withVanillaCellProps } from '@jsonforms/vanilla-renderers';

export const StringCell = withJsonFormsCellProps(
  withVanillaCellProps((props) => {
    const { data, enabled, path, handleChange } = props;

    return (
      <Input
        className="text-base"
        value={data || ''}
        onChange={(ev) => handleChange(path, ev.target.value === '' ? undefined : ev.target.value)}
        disabled={!enabled}
      />
    );
  })
);

export const string_cell_type = 'string_cell_type';

export const stringCellTester: RankedTester = rankWith(1, uiTypeIs(string_cell_type));
