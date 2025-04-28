/**
 * Validates if a URL is safe to redirect to
 * @param {string} url - The URL to validate
 * @param {string[]} allowedDomains - Array of allowed domains
 * @returns {string|null} - Returns the validated URL or null if invalid
 */

export function validateRedirectUrl(url, allowedDomains) {
    if (!url) return null;

    try {
        const urlObj = new URL(url);

        // Check if the URL is from an allowed domain
        const isAllowedDomain = allowedDomains.some(
            (domain) => urlObj.hostname === domain || urlObj.hostname.includes(`${domain}`)
        );

        if (!isAllowedDomain) return null;

        // Ensure the URL uses HTTPSq
        if (urlObj.protocol !== "https:") return null;

        // Remove any potentially dangerous URL parameters
        urlObj.searchParams.forEach((value, key) => {
            if (
                key.toLowerCase().includes("script") ||
                key.toLowerCase().includes("javascript") ||
                key.toLowerCase().includes("data")
            ) {
                urlObj.searchParams.delete(key);
            }
        });

        return urlObj.toString();
    } catch (e) {
        return null;
    }
}
