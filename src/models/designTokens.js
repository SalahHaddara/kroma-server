export const designTokensStructure = {
    "colors": [
        // Primary palette - Urban greys for modern feel
        [
            "#FFFFFF",
            "#F7F7F7",
            "#E5E5E5",
            "#CCCCCC",
            "#999999",
            "#666666",
            "#333333"
        ],
        // Accent colors - Vibrant sportswear inspired
        [
            "#FF3366",  // Energetic red
            "#00CCFF",  // Electric blue
            "#FFD100",  // Athletic yellow
            "#7000FF",  // Street purple
            "#00FF66",  // Neon green
            "#FF9900",  // Urban orange
            "#FF0099"   // Hype pink
        ],
        // Neutral palette - Street style
        [
            "#1A1A1A",  // Almost black
            "#2D2D2D",
            "#404040",
            "#595959",
            "#808080",
            "#A6A6A6",
            "#D9D9D9"
        ]
    ],
    "typography": {
        "fontFamily": "Inter",  // Modern, clean font for streetwear aesthetic
        "sizes": {
            "h1": 96,  // Bold, impactful headlines
            "h2": 72,
            "h3": 56,
            "paragraph": 16,
            "caption": 14
        }
    },
    "buttons": {
        "button1": {  // Primary CTA
            "background": "#FF3366",
            "text": "#FFFFFF",
            "hoverBackground": "#FF0044",
            "activeBackground": "#CC0033",
            "borderRadius": "4px",
            "paddingX": "24px",
            "paddingY": "16px",
            "fontSize": "18px",
            "fontWeight": "700",
            "letterSpacing": "0.5px",
            "textTransform": "uppercase"
        },
        "button2": {  // Secondary action
            "background": "#1A1A1A",
            "text": "#FFFFFF",
            "hoverBackground": "#333333",
            "activeBackground": "#000000",
            "borderRadius": "4px",
            "paddingX": "20px",
            "paddingY": "14px",
            "fontSize": "16px",
            "fontWeight": "600",
            "letterSpacing": "0.5px",
            "textTransform": "uppercase"
        },
        "button3": {  // Featured releases
            "background": "#7000FF",
            "text": "#FFFFFF",
            "hoverBackground": "#5C00D6",
            "activeBackground": "#4800AD",
            "borderRadius": "4px",
            "paddingX": "22px",
            "paddingY": "14px",
            "fontSize": "16px",
            "fontWeight": "600",
            "letterSpacing": "0.5px",
            "textTransform": "uppercase"
        },
        "button4": {  // Wishlist/Save
            "background": "#FFFFFF",
            "text": "#1A1A1A",
            "border": "#1A1A1A",
            "hoverBackground": "#F7F7F7",
            "activeBorder": "#000000",
            "borderRadius": "4px",
            "paddingX": "20px",
            "paddingY": "12px",
            "fontSize": "14px",
            "fontWeight": "600",
            "letterSpacing": "0.5px",
            "textTransform": "uppercase"
        },
        "button5": {  // Filter/Sort
            "background": "#F7F7F7",
            "text": "#1A1A1A",
            "border": "#E5E5E5",
            "hoverBackground": "#E5E5E5",
            "activeBorder": "#CCCCCC",
            "borderRadius": "4px",
            "paddingX": "16px",
            "paddingY": "10px",
            "fontSize": "14px",
            "fontWeight": "500",
            "letterSpacing": "0.5px",
            "textTransform": "uppercase"
        },
        "button6": {  // Size selector
            "background": "#FFFFFF",
            "text": "#1A1A1A",
            "border": "#E5E5E5",
            "hoverBackground": "#F7F7F7",
            "activeBorder": "#1A1A1A",
            "borderRadius": "4px",
            "paddingX": "16px",
            "paddingY": "16px",
            "fontSize": "14px",
            "fontWeight": "600",
            "letterSpacing": "0",
            "textTransform": "none"
        }
    },
    "spacing": {
        "micro": 4,
        "xs": 8,
        "sm": 12,
        "base": 16,
        "md": 24,
        "lg": 32,
        "xl": 48,
        "xxl": 64
    },
    "icons": {
        "icon1": {  // Shopping bag
            "svg": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 7h-3V6c0-2.21-1.79-4-4-4S8 3.79 8 6v1H5c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V9c0-1.11-.89-2-2-2zm-8-1c0-1.1.9-2 2-2s2 .9 2 2v1h-4V6z\" fill=\"currentColor\"/></svg>",
            "color": "#1A1A1A"
        },
        "icon2": {  // Heart/Wishlist
            "svg": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\" fill=\"currentColor\"/></svg>",
            "color": "#FF3366"
        },
        "icon3": {  // Search
            "svg": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\" fill=\"currentColor\"/></svg>",
            "color": "#1A1A1A"
        },
        "icon4": {  // Filter
            "svg": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z\" fill=\"currentColor\"/></svg>",
            "color": "#1A1A1A"
        },
        "icon5": {  // Size guide
            "svg": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z\" fill=\"currentColor\"/></svg>",
            "color": "#1A1A1A"
        },
        "icon6": {  // Share
            "svg": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z\" fill=\"currentColor\"/></svg>",
            "color": "#1A1A1A"
        }
    },
    "quote": {
        "styles": {
            "backgroundColor": "#F7F7F7",
            "cornerRadius": "4",
            "padding": "24"
        },
        "quoteSymbol": {
            "color": "#FF3366",
            "fontSize": "48"
        },
        "quote": {
            "text": "Sneakers are the new status symbol.",
            "color": "#1A1A1A",
            "fontSize": "24",
            "fontWeight": "600",
            "letterSpacing": "-0.5px"
        },
        "author": {
            "name": "Streetwear Culture",
            "color": "#666666",
            "fontSize": "16",
            "fontWeight": "500",
            "letterSpacing": "0"
        }
    },
    "alerts": {
        "alert1": {  // New drop alert
            "background": "#1A1A1A",
            "border": "#333333",
            "title": "#FFFFFF",
            "text": "#CCCCCC",
            "titleText": "New Drop Alert!",
            "message": "The latest Jordan release is now available.",
            "icon": "#FF3366",
            "borderRadius": "4px",
            "paddingX": "20px",
            "paddingY": "16px",
            "titleSize": "16px",
            "titleWeight": "700",
            "titleLetterSpacing": "0.5px",
            "messageSize": "14px",
            "messageWeight": "400",
            "messageLetterSpacing": "0",
            "borderWidth": "1px",
            "iconSize": "24px"
        },
        "alert2": {  // Limited stock
            "background": "#FFE5E5",
            "border": "#FF3366",
            "title": "#CC0033",
            "text": "#FF3366",
            "titleText": "Limited Stock",
            "message": "Only a few pairs left in your size!",
            "icon": "#FF3366",
            "borderRadius": "4px",
            "paddingX": "20px",
            "paddingY": "16px",
            "titleSize": "16px",
            "titleWeight": "700",
            "titleLetterSpacing": "0.5px",
            "messageSize": "14px",
            "messageWeight": "400",
            "messageLetterSpacing": "0",
            "borderWidth": "1px",
            "iconSize": "24px"
        },
        "alert3": {  // Promo alert
            "background": "#FFF3D9",
            "border": "#FFD100",
            "title": "#1A1A1A",
            "text": "#666666",
            "titleText": "Exclusive Offer",
            "message": "Use code SNEAKERDROP for 10% off your first purchase",
            "icon": "#FFD100",
            "borderRadius": "4px",
            "paddingX": "20px",
            "paddingY": "16px",
            "titleSize": "16px",
            "titleWeight": "700",
            "titleLetterSpacing": "0.5px",
            "messageSize": "14px",
            "messageWeight": "400",
            "messageLetterSpacing": "0",
            "borderWidth": "1px",
            "iconSize": "24px"
        },
        "alert4": {
            "background": "#E3F4FF",
            "border": "#2563EB",
            "title": "#1D4ED8",
            "text": "#1D4ED8",
            "titleText": "Exclusive Sale",
            "message": "Save 20% on selected styles. Shop now!",
            "icon": "#2563EB",
            "borderRadius": "12px",
            "paddingX": "20px",
            "paddingY": "16px",
            "titleSize": "20px",
            "titleWeight": "700",
            "titleLetterSpacing": "-0.8px",
            "messageSize": "16px",
            "messageWeight": "500",
            "messageLetterSpacing": "0.3px",
            "borderWidth": "4px",
            "iconSize": "26px"
        }
    },
    "shadows": {
        "sm": "0 1px 2px rgba(0, 0, 0, 0.07)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    "borderRadius": {
        "sm": "6px",
        "md": "12px",
        "lg": "18px",
        "xl": "24px",
        "full": "9999px"
    }
};