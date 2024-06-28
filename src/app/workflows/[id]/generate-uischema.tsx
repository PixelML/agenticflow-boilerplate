import { string_control_type } from '#/components/form/controls/string';
import { Workflow } from '#/lib/schemas/workflow';

export function generateUISchema(workflow: Workflow['input_schema']) {
  let elements: any[] = [];

  if (workflow.properties) {
    elements = Object.entries(workflow.properties).map(([key, value]) => {
      if (value.type === 'string') {
        return {
          type: string_control_type,
          scope: `#/properties/${key}`,
        };
      }
    });
  }

  return {
    type: 'form-layout-type',
    elements,
  };
}
