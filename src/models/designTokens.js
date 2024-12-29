export const designTokensStructure = {
    colors: [
        [
            "#FDF2E9",
            "#FAD7A0",
            "#F5B041",
            "#EB984E",
            "#E67E22",
            "#CA6F1E",
            "#A04000"
        ],
        [
            "#FDEDEC",
            "#F9EBEA",
            "#F5CBA7",
            "#F0B27A",
            "#E59866",
            "#DC7633",
            "#D35400"
        ],
        [
            "#FAFAFA",
            "#F4F4F4",
            "#E8E8E8",
            "#D1D1D1",
            "#9E9E9E",
            "#616161",
            "#424242"
        ]
    ],
    typography: {
        fontFamily: "Roboto",
        sizes: {
            h1: 72,
            h2: 54,
            h3: 44,
            paragraph: 18,
            caption: 14
        }
    },
    buttons: {
        button1: {
            background: "#0EA5E9",
            text: "#FFFFFF",
            hoverBackground: "#0284C7",
            activeBackground: "#0369A1",
            borderRadius: "12px",
            paddingX: "24px",
            paddingY: "14px",
            fontSize: "16px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            textTransform: "uppercase"
        },
        button2: {
            background: "#E879F9",
            text: "#FFFFFF",
            hoverBackground: "#D946EF",
            activeBackground: "#C026D3",
            borderRadius: "8px",
            paddingX: "20px",
            paddingY: "12px",
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "normal",
            textTransform: "none"
        },
        button3: {
            background: "#4B5563",
            text: "#FFFFFF",
            hoverBackground: "#374151",
            activeBackground: "#1F2937",
            borderRadius: "16px",
            paddingX: "32px",
            paddingY: "16px",
            fontSize: "18px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            textTransform: "none"
        },
        button4: {
            background: "#FFFFFF",
            text: "#0EA5E9",
            border: "#0EA5E9",
            hoverBackground: "#F0F9FF",
            activeBorder: "#0284C7",
            borderRadius: "24px",
            paddingX: "28px",
            paddingY: "14px",
            fontSize: "15px",
            fontWeight: "500",
            letterSpacing: "0.25px",
            textTransform: "capitalize"
        },
        button5: {
            background: "#FDF4FF",
            text: "#C026D3",
            border: "#E879F9",
            hoverBackground: "#FAE8FF",
            activeBorder: "#D946EF",
            borderRadius: "6px",
            paddingX: "16px",
            paddingY: "10px",
            fontSize: "13px",
            fontWeight: "400",
            letterSpacing: "1px",
            textTransform: "uppercase"
        },
        button6: {
            background: "#F9FAFB",
            text: "#1F2937",
            border: "#E5E7EB",
            hoverBackground: "#F3F4F6",
            activeBorder: "#D1D5DB",
            borderRadius: "4px",
            paddingX: "18px",
            paddingY: "8px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.8px",
            textTransform: "none"
        }
    },
    spacing: {
        micro: 4,
        xs: 8,
        sm: 12,
        base: 16,
        md: 24,
        lg: 32,
        xl: 48,
        xxl: 64
    },
    icons: {
        icon1: {
            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.85 8.4L22 9.31L16.72 13.77L18.26 20.78L12 17.27L5.74 20.78L7.28 13.77L2 9.31L9.15 8.4L12 2Z" fill="currentColor"/>
            </svg>`,
            color: "#E67E22"
        },
        icon2: {
            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
            </svg>`,
            color: "#DC7633"
        },
        icon3: {
            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="currentColor"/>
            </svg>`,
            color: "#A04000"
        },
        icon4: {
            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
            </svg>`,
            color: "#D35400"
        },
        icon5: {
            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
            </svg>`,
            color: "#E59866"
        },
        icon6: {
            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
            </svg>`,
            color: "#616161"
        }
    },
    quote: {
        styles: {
            backgroundColor: "#FFFBEB",
            cornerRadius: "6",
            padding: "16"
        },
        quoteSymbol: {
            color: "#FAD7A0",
            fontSize: "32"
        },
        quote: {
            text: "Design is intelligence made visible",
            color: "#A04000",
            fontSize: "14",
            fontWeight: "400",
            letterSpacing: "0.2px"
        },
        author: {
            name: "Alina Wheeler",
            color: "#E67E22",
            fontSize: "12",
            fontWeight: "500",
            letterSpacing: "0.1px"
        }
    },

};