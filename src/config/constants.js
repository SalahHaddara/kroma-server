export const DESIGN_TOKEN_PARTS = {
    part1: {
        colors: true,
        typography: true,
        buttons: true
    },
    part2: {
        spacing: true,
        icons: true,
        quote: true,
        alerts: true,
        shadows: true,
        borderRadius: true
    },
};

export const GPT_CONFIG = {
    model: "gpt-3.5-turbo",
    // model: "gpt-4o-mini",
    temperature: 0.7
};

export const IMAGE_GENERATION_CONFIG = {
    provider: process.env.IMAGE_PROVIDER || 'dalle', // 'dalle', 'stable-diffusion', 'midjourney'
    settings: {
        dalle: {
            model: 'dall-e-3',
            quality: 'standard',
            style: 'natural'
        },
        stableDiffusion: {
            model: 'stable-diffusion-xl-1024-v1-0',
            steps: 50,
            cfg_scale: 7.5
        },
        midjourney: {
            version: 'v4',
            style: 'raw'
        }
    }
};