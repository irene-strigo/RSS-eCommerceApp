import { BaseComponent } from '../../components/base-component/base-component';
import PageContainer from '../../components/page-container/page-container';

export type CloseFn = () => void;
export interface IPage {
  show(): Promise<void>;
  get pageClass(): string;
  get closeFn(): CloseFn;
}
export class AbstractPage implements IPage {
  protected appContainer: HTMLElement;

  protected pageContainer: BaseComponent;

  private promiseResolve: CloseFn | null;

  constructor(appContainer: HTMLElement | null) {
    if (appContainer === null) {
      throw new Error('appcontainer is invalid');
    }
    this.appContainer = appContainer;
    this.promiseResolve = null;
    this.pageContainer = PageContainer(this.pageClass);
    this.buildPage();
  }

  get pageClass(): string {
    return '';
  }

  get closeFn(): CloseFn {
    return this.close.bind(this);
  }

  protected buildPage(): void {}

  show(): Promise<void> {
    this.appContainer.innerHTML = '';
    this.appContainer.appendChild(this.pageContainer.getNode());
    const promise = new Promise<void>((resolve) => {
      this.promiseResolve = resolve;
    });
    // getGarageLength()
    // getCarNames()
    return promise;
  }

  close() {
    if (this.promiseResolve) {
      this.promiseResolve();
    }
  }
}
