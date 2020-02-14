interface Mountable {
  (
    moduleId: string,
    node: HTMLElement,
    store: any,
    props: any,
    mountCallback: () => void
  ): void;
}

type ComponentLoader = () => Promise<ComponentType>;
