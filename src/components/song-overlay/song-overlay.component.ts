import code from './song-overlay.component.html?inline';
import style from './song-overlay.component.css?inline';

const overlay = document.createElement('template');
overlay.innerHTML = `<style>${style}</style>${code}`;

export const SONG_TAG = 'song-overlay';

export class SongOverlayComponent extends HTMLElement {
    private gameState: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot?.appendChild(overlay.content.cloneNode(true));
        this.gameState = 'menu';

        console.log('hi from the song overlay owo');
    }

    public setGameState(newState: string) {
        this.gameState = newState;
    }

    public getGameState() {
        return this.gameState;
    }
}