export function removeAllChildren(container: HTMLElement) {
  while (container.childElementCount > 0)
    container.removeChild(container.children[0]);
}
