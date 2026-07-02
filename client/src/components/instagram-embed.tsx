import { useEffect } from "react";

/**
 * ElfsightInstagram — renders an Elfsight Instagram Feed widget.
 * Pass the widget's app class (e.g. "elfsight-app-xxxx-...").
 * Loads Elfsight's platform.js once; its built-in observer mounts the widget,
 * which works across SPA route changes.
 */
export function ElfsightInstagram({ appClass }: { appClass: string }) {
  useEffect(() => {
    const SRC = "https://elfsightcdn.com/platform.js";
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    } else {
      // Script already present (e.g. client-side navigation) — re-scan for the widget.
      (window as any).eapps?.Platform?.initializeAllWidgets?.();
    }
  }, [appClass]);

  return <div className={appClass} data-elfsight-app-lazy />;
}

/**
 * InstagramReels — renders native Instagram embeds for a list of post/reel
 * permalinks (e.g. "https://www.instagram.com/reel/XXXX/"). Instagram's
 * embed.js turns the blockquotes into real players (video included).
 *
 * Pass an empty array to render nothing — the page can then show just a
 * "Follow" CTA until reel links are supplied.
 */
export function InstagramReels({ urls }: { urls: string[] }) {
  useEffect(() => {
    if (!urls.length) return;
    const process = () => (window as any).instgrm?.Embeds?.process();
    const existing = document.getElementById("instagram-embed-js");
    if (existing) {
      process();
      return;
    }
    const s = document.createElement("script");
    s.id = "instagram-embed-js";
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onload = process;
    document.body.appendChild(s);
  }, [urls]);

  if (!urls.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
      {urls.map((url) => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            borderRadius: 12,
            boxShadow: "0 12px 36px rgba(13,17,23,0.10)",
            margin: 0,
            maxWidth: 340,
            width: "100%",
          }}
        />
      ))}
    </div>
  );
}
