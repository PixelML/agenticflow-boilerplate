import { Button } from '#/components/ui/button';
import { outputRenderers } from '#/components/output/renderers';
import { cn } from '#/lib/classnames';
import { NodeType } from '#/lib/schemas/node-type';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CircleCheckBigIcon, CircleXIcon, Loader2Icon } from 'lucide-react';
import React from 'react';
import AnimateHeight from 'react-animate-height';

interface Props {
  nodeType: NodeType;
  status?: string;
  title: string;
  data: any;
}

export const NodeOutput = ({ status, title, data, nodeType }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    if (status === 'success') {
      setIsExpanded(true);
    }
  }, [status]);

  const render = (key: string, nodeTypeProperty: NodeType['output_schema']['properties'][string]) => {
    const Renderer = outputRenderers.find((r) => r.schema.safeParse(nodeTypeProperty).success);

    if (!Renderer) {
      return <div>Unsupported output</div>;
    }

    if (status === 'loading') {
      return Renderer.loadingUI();
    }

    if (status === 'failed') {
      return Renderer.errorUI();
    }

    const result = Renderer.resultSchema.safeParse(data?.[key]);

    if (!result.success) {
      return <div>Invalid data</div>;
    }

    return Renderer.resultUI(result.data);
  };

  return (
    <div className="border bg-background shadow-sm overflow-hidden  rounded-md">
      <div className="flex items-center px-3 gap-2 py-3">
        <h3 className="flex-1 font-medium">{title}</h3>
        {status && (
          <div
            className={cn(
              'py-0.5 px-2 gap-2 flex items-center rounded font-medium text-xs border',
              status === 'success' && 'border-primary bg-primary/10 text-primary',
              status === 'failed' && 'border-destructive bg-destructive/10 text-destructive'
            )}
          >
            {status === 'loading' && <Loader2Icon className="animate-spin" size={14} />}
            {status === 'success' && <CircleCheckBigIcon size={14} />}
            {status === 'failed' && <CircleXIcon size={14} />}
            <span className="uppercase text-xs">{status}</span>
          </div>
        )}
        <Button
          className="size-7"
          variant="ghost"
          size="icon"
          disabled={!(status === 'success' || status === 'failed')}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <CaretSortIcon className="h-5 w-5" />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>

      <AnimateHeight
        key={status}
        duration={500}
        height={isExpanded && (status === 'success' || status === 'failed') ? 'auto' : 0}
      >
        <div className="flex flex-col border-t gap-3 p-3">
          {Object.entries(nodeType.output_schema.properties).map(([key, value]) => (
            <div key={key} className="p-3 rounded bg-muted">
              {render(key, value)}
            </div>
          ))}
        </div>
      </AnimateHeight>
    </div>
  );
};
