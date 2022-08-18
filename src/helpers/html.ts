export function renderHTML(template: string, id: string) {
    const wrapper = $('#' + id);
    if (wrapper) {
        wrapper.html(template);
    }
}