import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

import { writeFile } from "node:fs/promises";

export async function generateImage(prompt: string, image: string) {
  const input = {
    width: 768,
    height: 768,
    prompt: prompt,
    refine: "expert_ensemble_refiner",
    apply_watermark: false,
    num_inference_steps: 25,
    image: image,
  };

  const output = await replicate.run(
    "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
    { input }
  );

  console.log(output, "output");

  for (const [index, item] of Object.entries(output)) {
    await writeFile(`output_${index}.png`, item);
  }
  //=> output_0.png written to disk
}
