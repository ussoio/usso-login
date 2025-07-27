export async function loadDynamicFont(fontName, fontUrl, options = {}) {
    const { weight = "400", style = "normal", display = "swap" } = options;

    const font = new FontFace(fontName, `url(${fontUrl})`, {
        weight,
        style,
        display,
    });

    await font.load();
    document.fonts.add(font);
}

// Helper function to load font from font object
export async function loadFontFromObject(fontObject) {
    const { name, url, weight, style, display } = fontObject;
    return loadDynamicFont(name, url, { weight, style, display });
}
