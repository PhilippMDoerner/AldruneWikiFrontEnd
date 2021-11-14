import { VmPlayer, VmAudio, VmDefaultUi, defineCustomElements } from '@vime/core';

/**
 * @description For initializing Stencil components while bootstrapping the application.
 * See here for an example (https://vimejs.com/getting-started/installation#rollup--webpack), you'll want to check out the
 * "Rollup/Webpack" section
 */
export function initializeStencilComponents(): void{
    initializeVimeComponents();

    defineCustomElements();
}

function initializeVimeComponents(): void{
    customElements.define('vm-player', VmPlayer);
    customElements.define('vm-audio', VmAudio);
    customElements.define('vm-default-ui', VmDefaultUi);    
}