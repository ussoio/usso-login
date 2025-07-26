export async function loadDynamicFont(fontName, fontUrl) {
    const font = new FontFace(fontName, `url(${fontUrl})`);
    await font.load();
    document.fonts.add(font);
}
