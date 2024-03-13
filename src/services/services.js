export const submitForm = async (formData) => {
  return await fetch("https://codebuddy.review/submit", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const getAllPosts = async () => {
  const res = await fetch("https://codebuddy.review/posts");
  const data = await res.json();
  return data;
};
