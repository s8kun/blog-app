import React, { useState, useEffect } from "react";
import { Post } from "../../../types";
import { generateBlogPostContent } from "../../services/geminiService";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import { SparklesIcon } from "../ui/icons";

interface CreatePostFormProps {
  onSubmit: (
    postData: Omit<
      Post,
      "id" | "author" | "createdAt" | "likes" | "comments"
    > & { imageUrl?: string }
  ) => void;
  existingPost?: Post | null;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onSubmit,
  existingPost,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [tags, setTags] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setPreview(existingPost.imageUrl || "");
      setTags(existingPost.tags.join(", "));
    }
  }, [existingPost]);

  // رفع صورة من الجهاز
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // عرض المعاينة
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl =
      preview ||
      `https://picsum.photos/seed/${title.replace(/\s+/g, "-")}/1200/600`;
    const postData = {
      title,
      content,
      imageUrl,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    onSubmit(postData);
  };

  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const generatedContent = await generateBlogPostContent(aiPrompt);
      setContent((prev) =>
        prev ? `${prev}\n\n${generatedContent}` : generatedContent
      );
    } catch (error) {
      console.error("Failed to generate content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-center text-on-surface mb-8">
        {existingPost ? "Edit Post" : "Create a New Post"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* العنوان */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-on-background mb-1"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* AI Content Assistant */}
        <div className="p-4 bg-primary/10 rounded-lg space-y-2">
          <label
            htmlFor="ai-prompt"
            className="flex items-center space-x-2 text-sm font-medium text-primary"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>AI Content Assistant</span>
          </label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              id="ai-prompt"
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Enter a topic, e.g., 'the future of React'"
              className="flex-grow"
            />
            <Button
              type="button"
              onClick={handleGenerateContent}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </div>

        {/* المحتوى */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-on-background mb-1"
          >
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            required
          />
        </div>

        {/* رفع الصورة */}
        <div className="space-y-2">
          <label
            htmlFor="image-upload"
            className="inline-block cursor-pointer text-sm font-semibold tracking-wide text-on-surface hover:text-primary transition-colors duration-200"
          >
            Upload Image
          </label>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-white file:bg-primary hover:file:bg-primary/90 cursor-pointer"
          />
        </div>

        {/* الوسوم */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-on-background mb-1"
          >
            Tags (comma-separated)
          </label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., AI, React, WebDev"
          />
        </div>

        {/* زر النشر */}
        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">
            {existingPost ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreatePostForm;
