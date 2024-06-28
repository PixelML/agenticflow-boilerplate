import { cn } from '#/lib/classnames';
import { rankWith, uiTypeIs } from '@jsonforms/core';
import { DispatchCell, withJsonFormsControlProps } from '@jsonforms/react';

export const UploadAudioControlRenderer = withJsonFormsControlProps((props) => {
  const { cells, errors, uischema, schema, label, path, renderers } = props;

  return (
    <div className="flex flex-col gap-1">
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam delectus asperiores rem distinctio temporibus
        fugit, esse debitis voluptatum, voluptate laborum similique incidunt accusantium nobis magni doloremque, eaque
        sit aut. Unde!
      </div>

      <div className={cn('flex h-0 overflow-hidden opacity-0 duration-300', errors && 'h-4 opacity-100')}>
        <span className="text-sm leading-[14px] text-destructive">
          {label} {errors}
        </span>
      </div>
    </div>
  );
});

export const upload_audio_control_type = 'upload_audio_control_type';

export const uploadAudioControlTester = rankWith(1, uiTypeIs(upload_audio_control_type));
