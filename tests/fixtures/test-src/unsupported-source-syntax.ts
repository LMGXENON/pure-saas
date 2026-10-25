export type ComplexThemeProps<T extends Record<string, unknown> = { theme: 'dark' }> = {
  variant: T['theme'] extends 'dark' ? 'inverted' : 'standard';
  renderSnippet: (id: string) => `element-${number}`;
};

export function renderGenerics<T extends string>(val: T): string {
  const cssClass = `btn-${val}`;
  return `<div class="${cssClass}">Valid</div>`;
}
