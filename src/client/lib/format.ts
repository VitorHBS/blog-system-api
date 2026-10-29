export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const getTags = (tags?: string) =>
  tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

export const getExcerpt = (body?: string) => {
  if (!body) return "A fresh perspective from the blog, ready for readers who want useful ideas without the noise.";

  return body.length > 132 ? `${body.slice(0, 132).trim()}...` : body;
};
