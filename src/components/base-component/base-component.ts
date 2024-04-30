export type Props<T extends HTMLElement = HTMLElement> = Partial<Omit<T, 'tagName'>>;

export type TagName = keyof HTMLElementTagNameMap;

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  protected children: BaseComponent[] = [];

  constructor(
    tagName: TagName,
    props: Props<T> = {},
    children: (BaseComponent | HTMLElement | undefined)[] = [],
  ) {
    const node = document.createElement(tagName) as T;
    Object.assign(node, props);
    this.node = node;
    if (children) {
      this.appendChildren(children);
    }
  }

  append(child: BaseComponent | HTMLElement): void {
    if (child instanceof BaseComponent) {
      this.children.push(child);
      this.node.append(child.getNode());
    } else {
      this.node.append(child);
    }
  }

  appendChildren(children: (BaseComponent | HTMLElement | undefined)[]): void {
    children.forEach((el) => {
      if (el) {
        this.append(el);
      }
    });
  }

  setText(text: string): void {
    this.node.innerHTML = text;
  }

  setEventListener(event: keyof HTMLElementEventMap, listener: EventListener): void {
    this.node.addEventListener(event, listener);
  }

  setAttribute(attributeName: string, value: string): void {
    this.node.setAttribute(attributeName, value);
  }

  getAttribute(attributeName: string): string | null {
    return this.node.getAttribute(attributeName);
  }

  getValue(): string {
    return (this.node as unknown as HTMLInputElement).value;
  }

  getNode() {
    return this.node;
  }

  addClass(classNameClassName: string): void {
    this.node.classList.add(classNameClassName);
  }

  toggleClass(classSurname: string): void {
    this.node.classList.toggle(classSurname);
  }

  removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  destroyAll(): void {
    this.children.forEach((child) => child.destroy());
    this.children.length = 0;
  }

  destroy(): void {
    this.destroyAll();
    this.node.remove();
  }
}
