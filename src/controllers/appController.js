export function isMobileDevice() {
    return (window.innerWidth <= 600) || (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}