/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ─── Litera palette ────────────────────────────────────────
        // Usage: bg-paper, text-ink, border-border, bg-accent …
        paper: "#F5F0E8", // main background
        surface: "#EDE8DC", // card / panel
        surface2: "#E5DDD0", // nested card
        surface3: "#FAF7F2", // lightest tint

        ink: "#2C1810", // primary text
        umber: "#8B7355", // secondary / author names
        dust: "#A89880", // muted / timestamps

        accent: "#C4A070", // CTA buttons, active tags
        accentFg: "#FAF7F2", // text / icons on accent background

        border: "#D8D0BC", // default border
        borderDark: "#8B7355", // emphasis border (letterbox etc.)

        error: "#C0392B",
        success: "#6B8E5E",

        // ─── Litera numeric scale (for fine-grained use) ──────────
        litera: {
          50: "#FAF7F2",
          100: "#F5F0E8",
          200: "#EDE8DC",
          300: "#E5DDD0",
          400: "#D8D0BC",
          500: "#C4A070",
          600: "#A89880",
          700: "#8B7355",
          800: "#5C4030",
          900: "#2C1810",
        },
      },
      // ─── Font families ──────────────────────────────────────────
      // Default (no suffix) = Regular. Usage: font-playfair, font-playfair-bold …
      fontFamily: {
        // base — all text starts with this
        sans: ["PlayfairDisplay-Regular"],

        // Playfair weight variants
        playfair: ["PlayfairDisplay-Regular"],
        "playfair-md": ["PlayfairDisplay-Medium"],
        "playfair-sb": ["PlayfairDisplay-SemiBold"],
        "playfair-bold": ["PlayfairDisplay-Bold"],
        "playfair-eb": ["PlayfairDisplay-ExtraBold"],
        "playfair-black": ["PlayfairDisplay-Black"],

        // Italic variants
        "playfair-it": ["PlayfairDisplay-Italic"],
        "playfair-md-it": ["PlayfairDisplay-MediumItalic"],
        "playfair-sb-it": ["PlayfairDisplay-SemiBoldItalic"],
        "playfair-bold-it": ["PlayfairDisplay-BoldItalic"],
        "playfair-eb-it": ["PlayfairDisplay-ExtraBoldItalic"],
        "playfair-black-it": ["PlayfairDisplay-BlackItalic"],
      },
      // ─── Letter spacing ────────────────────────────────────────
      letterSpacing: {
        widest2: "0.25em", // brand title (LITERA)
        widest3: "0.35em",
      },

      // ─── Border radius ─────────────────────────────────────────
      borderRadius: {
        card: "12px",
        tag: "6px",
      },

      // ─── Box shadow (web / expo-web) ───────────────────────────
      boxShadow: {
        card: "0 2px 12px rgba(44,24,16,0.08)",
        soft: "0 1px  6px rgba(44,24,16,0.05)",
      },
    },
  },
  plugins: [],
};
