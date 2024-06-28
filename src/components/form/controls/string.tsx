import { cn } from '#/lib/classnames';
import { rankWith, uiTypeIs } from '@jsonforms/core';
import { DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';
import { string_cell_type } from '../cells/string';

export const StringControlRenderer = withJsonFormsControlProps((props) => {
  const { cells, errors, id, uischema, schema, label, path, renderers } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>

      <DispatchCell
        renderers={renderers}
        cells={cells}
        uischema={
          {
            ...uischema,
            type: string_cell_type,
          } as any
        }
        schema={schema}
        path={path}
      />

      <div className={cn('flex h-0 overflow-hidden opacity-0 duration-300', errors && 'h-4 opacity-100')}>
        <span className="text-sm leading-[14px] text-destructive">
          {label} {errors}
        </span>
      </div>
    </div>
  );
});

export const string_control_type = 'string_control_type';

export const stringControlTester = rankWith(1, uiTypeIs(string_control_type));
