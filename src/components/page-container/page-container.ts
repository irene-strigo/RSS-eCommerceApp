import { BaseComponent } from '../base-component/base-component';

import './page-container.css';

const PageContainer = (containerClass: string): BaseComponent => {
  const container = new BaseComponent('div', { className: 'page-container' });
  container.addClass(containerClass);
  return container;
};

export default PageContainer;
