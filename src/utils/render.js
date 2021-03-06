export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`
};

export const createElement = (Template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = Template;

  return newElement.firstChild;
};

export const renderComponent = (container, component, place = RenderPosition.BEFOREBEGIN) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      container.append(component.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElement = !!(parentElement && newElement && oldElement);

  if (isExistElement && parentElement) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
