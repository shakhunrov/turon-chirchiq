import { Suspense, useMemo } from 'react';
import type { ComponentRegistry, RenderContext, RenderNode } from '../cms/types';
import { canRender } from '../cms/permissions';
import { LayoutRenderer } from './LayoutRenderer';
import { useBreakpoint } from './useBreakpoint';

const LAYOUT_TYPES = new Set(['section', 'container', 'grid', 'row', 'stack']);

function mergeResponsiveProps(node: RenderNode, breakpoint: ReturnType<typeof useBreakpoint>) {
  const responsiveProps = node.responsive?.[breakpoint] ?? {};
  return {
    ...(node.props ?? {}),
    ...responsiveProps,
  };
}

export function RegistryRenderer({
  node,
  registry,
  context,
}: {
  node: RenderNode;
  registry: ComponentRegistry;
  context: RenderContext;
}) {
  const breakpoint = useBreakpoint();

  if (!canRender(node.visibility, context)) return null;

  if (node.type === 'block') {
    const blockKey = String(node.props?.key ?? '');
    const blockNodes = context.reusableBlocks[blockKey] ?? [];
    return (
      <>
        {blockNodes.map((blockNode, index) => (
          <RegistryRenderer
            key={blockNode.id ?? `${blockKey}-${index}`}
            node={blockNode}
            registry={registry}
            context={context}
          />
        ))}
      </>
    );
  }

  const children = node.children?.map((child, index) => (
    <RegistryRenderer
      key={child.id ?? `${node.id ?? node.type}-${child.type}-${index}`}
      node={child}
      registry={registry}
      context={context}
    />
  ));

  const props = useMemo(() => mergeResponsiveProps(node, breakpoint), [breakpoint, node]);

  if (LAYOUT_TYPES.has(node.type)) {
    return <LayoutRenderer node={node}>{children}</LayoutRenderer>;
  }

  const Component = registry[node.type];

  if (!Component) {
    return (
      <div className="renderer-error">
        Missing renderer component: <strong>{node.type}</strong>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="renderer-loading">Loading section...</div>}>
      <Component {...props} node={node}>
        {children}
      </Component>
    </Suspense>
  );
}
