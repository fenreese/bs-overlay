import $ from 'jquery';
import { renderHTML } from '../../helpers/html';
import SongOverlayHTML from './index.html';

export default class SongOverlay {
    private gameState: string;

    constructor() {
        this.gameState = 'menu';
        renderHTML(SongOverlayHTML, 'content');
    }

    private setGameState(newState: string) {
        this.gameState = newState;
    }
}