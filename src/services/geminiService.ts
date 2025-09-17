import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this environment, we'll log a warning.
  console.warn(
    "API_KEY environment variable not set. Gemini API calls will fail."
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateBlogPostContent = async (
  prompt: string
): Promise<string> => {
  if (!API_KEY) {
    return "Gemini API key is not configured. Please set the API_KEY environment variable. For now, here is some placeholder content based on your prompt to demonstrate functionality. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a blog post of about 3-4 paragraphs based on the following topic: "${prompt}". The tone should be informative and engaging for a tech audience. Do not include a title, just the main content.`,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    return `An error occurred while generating content. Please try again. \n\nDetails: ${
      error instanceof Error ? error.message : String(error)
    }`;
  }
};
