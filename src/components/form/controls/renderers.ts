import { NumberControlRenderer, numberControlTester } from './number';
import { StringControlRenderer, stringControlTester } from './string';
import { UploadAudioControlRenderer, uploadAudioControlTester } from './upload-audio';

export const controlRenderers = [
  {
    tester: stringControlTester,
    renderer: StringControlRenderer,
  },
  {
    tester: numberControlTester,
    renderer: NumberControlRenderer,
  },
  {
    tester: numberControlTester,
    renderer: NumberControlRenderer,
  },
  {
    tester: uploadAudioControlTester,
    renderer: UploadAudioControlRenderer,
  },
];
