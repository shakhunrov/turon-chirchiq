import type { RenderContext, VisibilityRule } from './types';

export function canRender(rule: VisibilityRule | undefined, context: RenderContext) {
  if (!rule) return true;

  if (rule.roles?.length && !rule.roles.includes(context.role)) {
    return false;
  }

  if (rule.permissions?.length) {
    const allowed = rule.permissions.every((permission) => context.permissions.includes(permission));
    if (!allowed) return false;
  }

  if (rule.featureFlags?.length) {
    const enabled = rule.featureFlags.every((flag) => context.featureFlags.includes(flag));
    if (!enabled) return false;
  }

  if (rule.audience === 'authenticated' && context.role === 'guest') {
    return false;
  }

  if (rule.audience === 'staff' && !['admin', 'teacher'].includes(context.role)) {
    return false;
  }

  return true;
}
