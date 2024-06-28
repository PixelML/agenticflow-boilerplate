import { controlRenderers } from './controls/renderers';
import { FormLayoutRenderer, formLayoutTester } from './form-layout-renderer';

export const formRenderers = [
  ...controlRenderers,
  {
    tester: formLayoutTester,
    renderer: FormLayoutRenderer,
  },
];
