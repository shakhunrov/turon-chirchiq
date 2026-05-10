import { useMemo, type CSSProperties, type ReactNode } from 'react';
import type { LayoutConfig, RenderNode } from '../cms/types';
import { useBreakpoint, resolveResponsiveValue } from './useBreakpoint';

const CONTAINER_WIDTHS = {
  none: undefined,
  sm: '760px',
  md: '960px',
  lg: '1200px',
  xl: '1440px',
  full: undefined,
};

function layoutClasses(kind: string, layout?: LayoutConfig) {
  const variant = layout?.variant ?? (kind === 'section' ? 'section' : 'plain');
  const align = layout?.align ?? 'stretch';
  const justify = layout?.justify ?? 'start';

  return [
    'renderer-layout',
    `renderer-layout-${variant}`,
    `renderer-align-${align}`,
    `renderer-justify-${justify}`,
  ].join(' ');
}

export function LayoutRenderer({
  node,
  children,
}: {
  node: RenderNode;
  children: ReactNode;
}) {
  const breakpoint = useBreakpoint();
  const layout = node.layout ?? {};
  const container = layout.container ?? (node.type === 'section' ? 'lg' : 'none');
  const gap = resolveResponsiveValue(layout.gap, breakpoint, 'md');
  const columns = resolveResponsiveValue(layout.columns, breakpoint, node.type === 'grid' ? 2 : 1);

  const style = useMemo(
    () =>
      ({
        '--renderer-container': CONTAINER_WIDTHS[container],
        '--renderer-columns': columns,
      }) as CSSProperties,
    [columns, container],
  );

  const contentClass =
    node.type === 'grid'
      ? 'renderer-grid'
      : node.type === 'row'
        ? 'renderer-row'
        : 'renderer-stack';

  const content = <div className={`${contentClass} renderer-gap-${gap}`}>{children}</div>;

  if (container === 'none') {
    return (
      <div className={layoutClasses(node.type, layout)} style={style}>
        {content}
      </div>
    );
  }

  return (
    <div className={layoutClasses(node.type, layout)} style={style}>
      <div className={container === 'full' ? 'renderer-container-full' : 'renderer-container'}>{content}</div>
    </div>
  );
}
