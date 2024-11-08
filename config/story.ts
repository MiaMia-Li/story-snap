export const STYLE_PRESETS = [
  {
    id: "fantasy_adventure",
    name: "Fantasy Adventure",
    description: "Epic quests and mysterious landscapes",
    thumbnail: "/styles/fantasy.jpg",
    prompt: `
      Comic storyboard inspired by the uploaded image's theme. Four frames unfold an adventurous fantasy story:
      1) The main characters are introduced, standing at the edge of an unknown land that reflects the uploaded image's unique landscape;
      2) They begin their journey, encountering mystical elements from the image, such as glowing plants or ancient ruins;
      3) Tension rises as they face an unexpected challenge, hinted at in the original image;
      4) A cliffhanger, with characters gazing into the vast, unexplored world ahead. Hand-drawn fantasy style with rich colors and dramatic lighting, adapting to the image's tone and scenery.`,
    promptText: `
      Based on the image, craft a tale where heroes venture into a mystical land, drawing inspiration from the unique landscapes, colors, and elements seen. Describe the characters' journey and the magical challenges they encounter.`,
  },
  {
    id: "noir_detective",
    name: "Noir Detective",
    description: "Dark, mysterious investigations",
    thumbnail: "/styles/noir.jpg",
    prompt: `
      Noir-style comic inspired by the uploaded image. Four frames capture a suspenseful detective story:
      1) The detective enters a scene that mirrors the mood and elements of the uploaded image, such as a dimly lit room or shadowy streets;
      2) A close-up of the detective discovering a clue, with details reflecting the original image’s objects or themes;
      3) A silhouette or mysterious figure appears in the background, inspired by the image's shadows or mood;
      4) The detective sets off, the tension mounting as they move into a shadowy alley. Black and white linework with heavy shadows, adapting to the image's ambiance.`,
    promptText: `
      Create a suspenseful detective narrative inspired by the image’s dark elements and mysterious ambiance. Detail the detective’s journey and clues, weaving in shadows and intrigue from the scene.`,
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Future",
    description: "High-tech, neon-lit worlds",
    thumbnail: "/styles/cyberpunk.jpg",
    prompt: `
      Cyberpunk comic storyboard that draws inspiration from the uploaded image’s futuristic elements. Four frames capture a cyberpunk storyline:
      1) The protagonist stands in a neon cityscape, with elements mirroring the image's technology or city features;
      2) They navigate crowded, high-tech streets, inspired by structures or colors from the image;
      3) They avoid security drones or cyber threats, influenced by shapes or lights seen in the image;
      4) The protagonist pauses to gaze at the city's skyline, mirroring the original image’s futuristic aesthetic. Vibrant neon colors and cyberpunk aesthetic, adapting to the image's tech and design.`,
    promptText: `
      Based on the futuristic aspects of the image, narrate a cyberpunk story with high-tech elements, neon lights, and a cityscape that feels both crowded and ominous. Describe the character's journey in this cyber world.`,
  },
  {
    id: "fairy_tale",
    name: "Fairy Tale",
    description: "Enchanted, magical realms",
    thumbnail: "/styles/fairytale.jpg",
    prompt: `
      Fairy tale storyboard inspired by the uploaded image. Four whimsical frames:
      1) The main character enters a forest or mystical setting that reflects elements of the image, such as flora or magical light;
      2) They encounter a magical creature or enchanted object, inspired by details in the image;
      3) They follow a path lined with glowing plants or fantasy elements, similar to the image’s mood or color scheme;
      4) The character discovers a hidden wonder, ending the sequence with a sense of enchantment. Soft watercolor textures, pastel tones, adjusting to the image’s colors and magical vibe.`,
    promptText: `
      Weave a magical fairy tale that draws on the enchanting elements of the image. Describe a character's journey through a forest filled with mystical creatures and glowing lights inspired by the image.`,
  },
  {
    id: "historical_legend",
    name: "Historical Legend",
    description: "Epic stories of ancient heroes",
    thumbnail: "/styles/historical.jpg",
    prompt: `
      Historical comic storyboard inspired by the uploaded image. Four frames tell a legend:
      1) A heroic figure appears in a landscape or setting influenced by the image’s historical or natural details;
      2) They prepare for an epic journey or battle, with elements from the image incorporated as background or armor details;
      3) A climactic moment as the hero confronts an enemy or challenge, inspired by dramatic aspects of the image;
      4) A victorious or solemn pose under the setting sun, mirroring the image’s lighting or atmosphere. Classical painting style, rich in color and texture, matching the image's historical feel.`,
    promptText: `
      Using the historical and natural elements from the image, describe an ancient hero’s journey. Detail the settings, challenges, and grand moments influenced by the image’s theme.`,
  },
  {
    id: "romantic_anime",
    name: "Romantic Anime",
    description: "Heartwarming encounters in vibrant settings",
    thumbnail: "/styles/romance.jpg",
    prompt: `
      Romantic anime-inspired storyboard based on the uploaded image’s themes. Four frames capture a romantic moment:
      1) The couple is introduced in a setting that reflects the cozy or vibrant details of the image, like a café or scenic spot;
      2) A close-up of their shared laughter or a gentle gesture, inspired by colors or lighting in the image;
      3) They lean close, sharing a heartfelt connection with details drawn from the image’s ambiance;
      4) The scene ends with a tender moment, reflecting the image’s soft, warm tones. Bright anime style with soft lines, adapted to the image’s mood and color palette.`,
    promptText: `
      Craft a heartwarming romance inspired by the setting and color palette of the image. Describe tender moments and interactions that echo the ambiance and details of the scene.`,
  },
  {
    id: "dynamic_sketch",
    name: "Dynamic Sketch",
    description: "Intense action sequences in futuristic settings",
    thumbnail: "/styles/dynamic.jpg",
    prompt: `
      Action-packed comic sequence inspired by the uploaded image’s energetic or futuristic elements. Four frames capture an intense chase:
      1) The main character sprints through a scene similar to the uploaded image’s cityscape or environment;
      2) They dodge obstacles, with details from the image adding depth to the surroundings;
      3) The protagonist uses a tool or trick to escape, inspired by the image’s high-tech features;
      4) They evade pursuers, ending the sequence in an alley or hidden spot. Bold, dynamic sketch style with rapid strokes, capturing the image's energy and motion.`,
    promptText: `
      Based on the image’s high-energy elements, narrate a thrilling chase scene where the character navigates an environment inspired by the image’s setting and futuristic details.`,
  },
];
