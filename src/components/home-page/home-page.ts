import { HOME_TAG, HomePageComponent } from "./home-page.component";

if (customElements.get(HOME_TAG) === undefined) {
    customElements.define(HOME_TAG, HomePageComponent);
}