/**
 * @description Adds an animation to an element and removes it once the animation has completed.
 * @param element The HTMLElement to be animated
 * @param animationName The name of the animation from animate.css to be used here. 
 * Basically the CSS class without the "animate__" prefix
 * @param prefix optional. The prefix to add to the animationName
 * @returns {void}
 */
export const animateElement = (element: HTMLElement, animationName: string, prefix = 'animate__') => {
    if(element == null) throw "Invalid Input Exception. The given element is null";

  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationCSSClass = `${prefix}${animationName}`;

    element.classList.add(`${prefix}animated`, animationCSSClass);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationCSSClass);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

}
