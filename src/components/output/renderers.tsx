import * as stringRenderer from './string';
import * as imageRenderer from './image';
import * as videoRenderer from './video';
import * as audioRenderer from './audio';
import * as unsupportedRenderer from './unsupported';

export const outputRenderers = [imageRenderer, videoRenderer, audioRenderer, stringRenderer, unsupportedRenderer].map(
  (renderer) => ({
    schema: renderer['typeSchema'],
    resultSchema: renderer['resultSchema'],
    loadingUI: renderer['LoadingUI'],
    resultUI: renderer['ResultUI'],
    errorUI: renderer['ErrorUI'],
  })
);
