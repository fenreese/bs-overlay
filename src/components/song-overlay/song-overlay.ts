import { SONG_TAG, SongOverlayComponent } from "./song-overlay.component";

if (customElements.get(SONG_TAG) === undefined) {
    customElements.define(SONG_TAG, SongOverlayComponent);
}