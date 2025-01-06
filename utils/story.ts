export const updateStory = async (storyId: string, image: string) => {
  try {
    const payload = {
      image,
      storyId,
    };

    const response = await fetch("/api/story/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // await refreshCredits();

    return data;
  } catch (error) {
    console.error("saveStoryWithAllImages error:", error);
    throw error;
  }
};
// 故事保存相关函数
export const saveStory = async (title: string, content: string) => {
  try {
    const payload = {
      title,
      content,
      count: 5,
    };

    console.log(payload, "--payload");

    const response = await fetch("/api/story/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.story;
  } catch (error) {
    console.error("saveStoryWithAllImages error:", error);
    throw error;
  }
};
