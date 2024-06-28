import { rankWith, uiTypeIs } from '@jsonforms/core';
import { DispatchCell, JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import React from 'react';

export const FormLayoutRenderer = withJsonFormsLayoutProps((props) => {
  const { uischema, schema, path, visible, renderers, cells } = props;

  return (
    <div className="flex gap-3 flex-col">
      {(uischema as any).elements.map((child: any, index: number) => (
        <JsonFormsDispatch
          key={index}
          renderers={renderers}
          cells={cells}
          uischema={child}
          schema={schema}
          path={path}
        />
      ))}
    </div>
  );
});

export const formLayoutTester = rankWith(1, uiTypeIs('form-layout-type'));
