declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Fbq;
};

const META_PIXEL_ID =
  import.meta.env.VITE_META_PIXEL_ID ?? "1556856686018623";

export function isMetaPixelEnabled(): boolean {
  return Boolean(META_PIXEL_ID);
}

export function initMetaPixel(): void {
  if (!isMetaPixelEnabled() || typeof window === "undefined" || window.fbq) {
    return;
  }

  !(function (f, b, e, v, n?, t?, s?) {
    if (f.fbq) return;
    n = f.fbq = function (...args: unknown[]) {
      n!.callMethod ? n!.callMethod.apply(n, args) : n!.queue.push(args);
    } as Fbq;
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s!.parentNode!.insertBefore(t, s!);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  window.fbq!("init", META_PIXEL_ID);
  window.fbq!("track", "PageView");
}

export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (!isMetaPixelEnabled() || !window.fbq) {
    return;
  }

  if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}
