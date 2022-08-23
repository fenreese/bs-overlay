import code from './home-page.component.html?inline';
import style from './home-page.component.css?inline';

const home = document.createElement('template');
home.innerHTML = `<style>${style}</style>${code}`;

export const HOME_TAG = 'home-page';

export class HomePageComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(home.content.cloneNode(true));
        console.log('hi from index owo');
    }
}