export const STYLE_PRESETS = [
  {
    id: "dynamic_sketch",
    name: "Dynamic Sketch",
    description: "Intense action sequences in futuristic settings",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/out-0%20(16)-5nYnqocqdlCfgP2kz0WdZKTJ0O1Y6w.webp",
    promptText: `
      Capture the thrill of a high-speed chase through a futuristic cityscape where gravity takes a backseat. Depict intense action as characters sprint across hovering platforms and race through urban mazes in a high-energy tale of suspense and adrenaline.`,
    promptImage: `
      Create a four-panel dynamic comic strip in a futuristic city. Use sharp lines and dynamic poses, showing action-packed scenes with intense energy. Each panel should have rounded corners and slight shadows for emphasis.`,
  },
  {
    id: "animated_sticker",
    name: "Animated Sticker",
    description: "Cute and playful sticker-style illustrations",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/out-0%20(14)-Or4ItfgHTZ7dgdaPjp1uT3CuXXalXs.webp",
    promptText: `
      Share a cute and uplifting story with chibi characters exploring a whimsical world. Highlight endearing interactions and playful expressions in a setting full of kawaii elements like stars, hearts, and magical sparkles that make each scene feel like an adorable sticker.`,
    promptImage: `
      Create a four-panel kawaii comic strip in chibi style with pastel colors, rounded corners, and decorative elements like stars and sparkles. Use thick outlines, cute expressions, and slight drop shadows for a playful sticker effect.`,
  },
  {
    id: "fantasy_adventure",
    name: "Fantasy Adventure",
    description: "Epic quests and mysterious landscapes",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/out-0%20(9)-HRR1lq5dlS0CY7SOR5lItCD3SKac8X.webp",
    promptText: `
      Embark on an epic adventure through fantastical worlds suspended in the sky. Describe the heroes' journey as they traverse mystical realms filled with floating islands, enchanted creatures, and ancient artifacts, where every landscape tells a story of wonder and magic.`,
    promptImage: `
      Create a four-panel comic strip in fantasy style, with each frame in a 2x2 grid on a single canvas. Use vibrant colors, magical lighting effects, and ethereal landscapes, depicting the heroes' journey across floating islands and mystical realms. Each panel should have rounded corners, a slight drop shadow, and convey a sense of wonder.`,
  },
  // {
  //   id: "noir_detective",
  //   name: "Noir Detective",
  //   description: "Dark, mysterious investigations",
  //   thumbnail: "/styles/noir.jpg",
  //   promptText: `
  //     Uncover a dark and supernatural mystery in a shadowy city where magic hides in plain sight. Follow a detective's gritty investigation through narrow alleys, dimly lit rooms, and haunted streets, as they encounter eerie clues that blur the line between reality and the unknown.`,
  //   promptImage: `
  //     Create a four-panel noir comic strip in a dark, mysterious style. Use a high-contrast palette with shadowed effects, showing the detective's eerie journey through supernatural landscapes. Rounded corners and a slight drop shadow enhance each frame.`,
  // },
  {
    id: "cyberpunk",
    name: "Cyberpunk Future",
    description: "High-tech, neon-lit worlds",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/out-0%20(20)-tBoWVhJbpyAqlvjgl5gmLGCq0u2IRc.webp",
    promptText: `
      Dive into a high-tech dystopian world where towering neon cities defy gravity. Narrate the lives of characters navigating a chaotic metropolis filled with holographic billboards, floating structures, and cutting-edge technology, capturing both the allure and perils of a cyberpunk future.`,
    promptImage: `
      Create a four-panel cyberpunk comic strip in a 2x2 grid, with neon-lit, futuristic cityscapes in each frame. Use neon colors, holographic accents, and anti-gravity platforms, emphasizing a high-tech atmosphere with slight drop shadows around each panel.`,
  },
  {
    id: "fairy_tale",
    name: "Fairy Tale",
    description: "Enchanted, magical realms",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/out-0%20(21)-g7S4eAI7RgxFFrSo03JC20lAws0Y1p.webp",
    promptText: `
      Enter a world of magic and wonder, where enchanted forests, floating petals, and friendly spirit creatures await. Tell a gentle story of discovery and adventure, as characters explore a place where the impossible becomes possible, surrounded by beauty and whimsy at every turn.`,
    promptImage: `
      Create a four-panel fairy-tale comic strip with pastel colors and a magical theme. Depict floating flowers, spirit creatures, and a whimsical atmosphere. Each panel should have rounded corners and a slight drop shadow for a soft, enchanting effect.`,
  },
  // {
  //   id: "historical_legend",
  //   name: "Historical Legend",
  //   description: "Epic stories of ancient heroes",
  //   thumbnail: "/styles/historical.jpg",

  //   promptText: `
  //     Chronicle a legend of ancient wonders and floating ruins. Tell the tale of a hero uncovering the mysteries of a long-lost civilization that mastered the art of defying gravity.`,
  //   promptImage: `
  //     Create a four-panel comic strip in historical legend style with ancient floating temples and monuments. Use rich textures, dramatic lighting, and architectural grandeur. Each panel should have a slight drop shadow, enhancing the legendary atmosphere.`,
  // },
  {
    id: "romantic_anime",
    name: "Romantic Anime",
    description: "Heartwarming encounters in vibrant settings",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/out-0%20(18)-WBMmn5Cd0HARhrAkBeux3ZFR0OFOby.webp",
    promptText: `
      Journey into the past to witness the legends of ancient heroes and lost civilizations. Describe the discovery of majestic ruins suspended in the air, where a hero unearths the secrets of a forgotten culture known for defying gravity, capturing the grandeur and mystery of history’s epic tales.`,
    promptImage: `
      Create a four-panel romantic anime comic strip, with each frame showing warm, pastel-colored scenes of love on floating islands. Use soft lines and ethereal lighting effects. Rounded corners and a slight drop shadow give a cozy feel to each panel.`,
  },
];

export const TONE_PROMPTS = [
  {
    value: "professional",
    prompt:
      "Compose a response with a polished and professional tone. Focus on clarity, conciseness, and a formal style appropriate for business communication.",
  },
  {
    value: "friendly",
    prompt:
      "Write a response in a warm and friendly tone. Use approachable language that fosters a positive and casual connection.",
  },
  {
    value: "humorous",
    prompt:
      "Create a response with a touch of humor. Add light-hearted wit and playful expressions while keeping the message clear.",
  },
  {
    value: "formal",
    prompt:
      "Write a response in a formal tone. Maintain respect and professionalism with precise and structured language.",
  },
  {
    value: "casual",
    prompt:
      "Craft a response in a relaxed and casual tone. Use simple, conversational language as if speaking to a close friend.",
  },
  {
    value: "enthusiastic",
    prompt:
      "Generate a response bursting with enthusiasm. Use upbeat language and positive energy to convey excitement.",
  },
  {
    value: "empathetic",
    prompt:
      "Write a response with an empathetic tone. Focus on understanding and addressing emotions with care and kindness.",
  },
  {
    value: "direct",
    prompt:
      "Create a response that is direct and to the point. Avoid unnecessary details while ensuring clarity and purpose.",
  },
];

export const STYLE_PROMOT = [
  {
    id: "realistic",
    promptText:
      "Create a highly realistic image with intricate details and lifelike textures.",
    promptImage:
      "A stunning realistic portrait or landscape that looks almost like a photograph, ID: realistic",
  },
  {
    id: "anime",
    promptText:
      "Generate an anime-style image with vibrant colors and expressive characters.",
    promptImage:
      "A colorful anime scene with dynamic characters and detailed backgrounds, ID: anime",
  },
  {
    id: "digital_art",
    promptText:
      "Produce a piece of digital art with bold colors and creative designs.",
    promptImage:
      "A vibrant and modern digital art piece showcasing abstract or futuristic elements, ID: digital_art",
  },
  {
    id: "oil_painting",
    promptText:
      "Create an image resembling a classic oil painting with rich textures and brushstrokes.",
    promptImage:
      "An elegant oil painting of a serene landscape or a historical portrait, ID: oil_painting",
  },
  {
    id: "cyberpunk",
    promptText:
      "Design a cyberpunk-themed image with neon lights and futuristic vibes.",
    promptImage:
      "A futuristic cyberpunk cityscape glowing with neon lights and high-tech details, ID: cyberpunk",
  },
  {
    id: "watercolor",
    promptText:
      "Generate a delicate watercolor image with soft edges and light, airy colors.",
    promptImage:
      "A soft watercolor painting of a natural landscape or floral composition, ID: watercolor",
  },
  {
    id: "3d_render",
    promptText:
      "Create a 3D-rendered image with realistic lighting and detailed modeling.",
    promptImage:
      "A high-quality 3D render of a futuristic object or architectural design, ID: 3d_render",
  },
  {
    id: "pixel_art",
    promptText:
      "Produce a retro pixel art image with vibrant and blocky pixel aesthetics.",
    promptImage:
      "A nostalgic pixel art scene, such as a game-like environment or character, ID: pixel_art",
  },
  {
    id: "comic",
    promptText:
      "Design an image in a comic book style with bold lines and vibrant colors.",
    promptImage:
      "A comic book-style image with dynamic characters and detailed backgrounds, ID: comic",
  },
  {
    id: "minimalist",
    promptText: "Create a minimalist image with a clean and simple design.",
    promptImage:
      "A minimalist image with a clean and simple design, ID: minimalist",
  },
  {
    id: "cinematic",
    promptText: "Create a cinematic image with a dramatic and intense style.",
    promptImage:
      "A cinematic image with a dramatic and intense style, ID: cinematic",
  },
  {
    id: "fantasy",
    promptText: "Create a fantasy image with a magical and imaginative style.",
    promptImage:
      "A fantasy image with a magical and imaginative style, ID: fantasy",
  },
];

export const TEMPLATE_IMAGES: Map<string, { images: string[] }> = new Map(
  Object.entries({
    animated_sticker: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7794-hM7qKTw8Jr8zcxrvqLGgeClH82dHhI.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7819-LbTgCyW84hj2FXqFTL4ZBImP86xeC0.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7821-8fm9x9hibOTEIWPi4RNOEnBLViQPHf.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7822-Z7TCRrWU0tSOBd47HoaRCmeB2HHVSV.JPG",
      ],
    },
    dynamic_sketch: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7798-fDXJ0rCHvFNxRGrVSzbaKWFKQPWhFw.jpg",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7816-rAjuazw1OsMD50ByfrytDREmWIDWuQ.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7817-6wDhm7ZTl7F2CNMsSOdTB7303IAoBe.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7818-kKQmxdYrqDYLq70RlKyjtOzZh7IPVF.JPG",
      ],
    },
    romantic_anime: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7797-SX0XMQHTEwn3p1mHn5XsIcFPn0UV5h.jpg",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7832-ZO7CJF6R7J4tDkCW1fbM9s15UBxxrw.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7833-1iky3lqcydtPVkz3aCqaDD1vW8uHlh.JPG",
      ],
    },
    fairy_tale: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7796%202-N2kh3iAnfwGNeTNltivs9WhK9HpTNS.jpg",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7836-RBTnRTeV2lpthXXjOljSLShHjg2qZ1.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7837-q3aZDrJrrgkGTOY7oXi8CVk0XuEw0s.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7842-SZEWtDR0u9atCk0Q9ntGk26IycDAYt.JPG",
      ],
    },
    cyberpunk: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7824-QMxeqDZYJaM8MuvMjpLyb63wNPc4tz.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7825-bxQZyASQAFpCX79yDGmbazOgWJQuyJ.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7826-hx6Y67FgDO0D0FQpDJ8R343Qm2dsH8.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7827-Khy3f22KvuCkpV2Kj8CiZkBoOUJZZD.JPG",
      ],
    },
    fantasy_adventure: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7835-Ja9S0EiWpmvCUwdOt0bu6VUKKKTPKV.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7839-6yExouRskOLKf4T71ZyP7JZcfBqdVa.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7840-IYq0FRujY472hDU2z23vIvwMAjz5QL.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7841-xQbsmlZ1zpnTrwkqcaL4ZJlzMwgpny.JPG",
      ],
    },
    realistic: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7929-KhtIGGGi45LLQ1GN85GL5KvAunbXOP.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7797-SX0XMQHTEwn3p1mHn5XsIcFPn0UV5h.jpg",
      ],
    },
    anime: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7794-hM7qKTw8Jr8zcxrvqLGgeClH82dHhI.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7819-LbTgCyW84hj2FXqFTL4ZBImP86xeC0.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7821-8fm9x9hibOTEIWPi4RNOEnBLViQPHf.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7822-Z7TCRrWU0tSOBd47HoaRCmeB2HHVSV.JPG",
      ],
    },
    digital_art: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7910-eHylLAUpw38Pn5JacAG8kaWKCzsvuz.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7911-8qTKCqFNWPE3afNfG9A8RdWIli3MLx.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7913-lIfUWLVPOXlUtIlRRa2PoUqUVz86fi.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7914-Wu16oIWxQqqCMMpRwa8wuiX11uXbh5.JPG",
      ],
    },
    oil_painting: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7892-shKzyE1YnL4EQwy4SCynL34Fb150j9.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7893-asntJioj38Z5Dcckk5FYv5Tbbn0pM7.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7894-fcBTHDNTGHlfSHotQFqHbYTSxJgiie.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7896-fIQiB0kpZNTkEqge47gTSY4tyVlc7h.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7897-yVmTRrYcBH6EmoMvRH9tRYDgc2AsaP.JPG",
      ],
    },
    watercolor: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7898-qSl8O0wmtG7P9Lls7c8IFQbyULERoA.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7903-4cq6up5XnR3ly2Xxcfn9XV2JYXRnMj.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7904-Mbip4YMdni7Jo3i1PBCW6vXdda7yLH.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7905-4bF9slfuvpcYOQlLpOzEYj7QOcIclp.JPG",
      ],
    },
    "3d_render": {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7934-3YccjfFGEidLuSOkcNxS8jWSX6ZrSv.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7935-klBI4wkugmeyReiJNIeuRfg6fIA4sI.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7936-lAFUR1ZXGM5aMs2hjQKHjbmd5MAyrs.JPG",
      ],
    },
    pixel_art: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7909-XtXcjoxc9AbETevuQ4U1ayj9hgUW6J.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7920-x9zP1AbkS0eMhYew9psAXrObt2A3m7.JPG",
      ],
    },
    comic: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7907-u63I7W5ICETCbjwDSb8O7DzeClvn2a.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7912-dvtopeluCgp7wBomehQIq8x5wUbI7u.JPG",
      ],
    },
    fantasy: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7908-D8AmB9OGxwOCNIjSibSFF4gANM4avO.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7917-v3cFPMjFQ58bmTxgYIInh49vjqWGRw.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7927-gmfeaPY1bLfimrvkAQOnXKEvVDLim2.JPG",
      ],
    },
    // cyberpunk: {
    //   images: [],
    // },
    minimalist: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7798-fDXJ0rCHvFNxRGrVSzbaKWFKQPWhFw.jpg",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7816-rAjuazw1OsMD50ByfrytDREmWIDWuQ.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7817-6wDhm7ZTl7F2CNMsSOdTB7303IAoBe.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7818-kKQmxdYrqDYLq70RlKyjtOzZh7IPVF.JPG",
      ],
    },
    cinematic: {
      images: [
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7921-Pv3GIVgwj3x8BdwoF170c0v5Yluucj.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7933-ddUd150FyPuhtDuxFjOoVyLV7K9yFq.JPG",
        "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7932-vFK7Ikm8PhNgJxq43dByuvu4hPBr4o.JPG",
      ],
    },
  })
);
