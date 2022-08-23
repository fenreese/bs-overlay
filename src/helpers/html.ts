const getShadowElement = (shadowName: string, element: string) => {
    const input = document.getElementsByTagName(shadowName)[0];
    const shadow = input.shadowRoot;
    return shadow?.querySelector(element);
}

export const updateShadowElementText = (shadowName: string, element: string, newValue: string) => {
    try {
        const shadowElement = getShadowElement(shadowName, element);
        if (shadowElement?.textContent) {
            shadowElement.textContent = newValue;
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateShadowElementImage = (shadowName: string, element: string, newImage: string) => {
    try {
        const shadowElement = getShadowElement(shadowName, element);
        if (shadowElement?.getAttribute('src')) {
            shadowElement.setAttribute('src', newImage);
        }
    } catch (error) {
        console.log(error);
    }
}
