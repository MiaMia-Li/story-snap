export const STYLE_PRESETS = [
  {
    id: "fantasy_adventure",
    name: "Fantasy Adventure",
    description: "Epic quests and mysterious landscapes",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7839-6yExouRskOLKf4T71ZyP7JZcfBqdVa.JPG",
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
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7824-QMxeqDZYJaM8MuvMjpLyb63wNPc4tz.JPG",
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
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7836-RBTnRTeV2lpthXXjOljSLShHjg2qZ1.JPG",
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
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7832-ZO7CJF6R7J4tDkCW1fbM9s15UBxxrw.JPG",
    promptText: `
      Journey into the past to witness the legends of ancient heroes and lost civilizations. Describe the discovery of majestic ruins suspended in the air, where a hero unearths the secrets of a forgotten culture known for defying gravity, capturing the grandeur and mystery of history’s epic tales.`,
    promptImage: `
      Create a four-panel romantic anime comic strip, with each frame showing warm, pastel-colored scenes of love on floating islands. Use soft lines and ethereal lighting effects. Rounded corners and a slight drop shadow give a cozy feel to each panel.`,
  },
  {
    id: "dynamic_sketch",
    name: "Dynamic Sketch",
    description: "Intense action sequences in futuristic settings",
    thumbnail:
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7798-fDXJ0rCHvFNxRGrVSzbaKWFKQPWhFw.jpg",
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
      "https://yggd8boz08mj0dzm.public.blob.vercel-storage.com/template/IMG_7822-Z7TCRrWU0tSOBd47HoaRCmeB2HHVSV.JPG",
    promptText: `
      Share a cute and uplifting story with chibi characters exploring a whimsical world. Highlight endearing interactions and playful expressions in a setting full of kawaii elements like stars, hearts, and magical sparkles that make each scene feel like an adorable sticker.`,
    promptImage: `
      Create a four-panel kawaii comic strip in chibi style with pastel colors, rounded corners, and decorative elements like stars and sparkles. Use thick outlines, cute expressions, and slight drop shadows for a playful sticker effect.`,
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
  })
);
