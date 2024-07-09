const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "dfBCxBhZiQSp8unNq33cKAf0xE4XjT4ZVS74E8iM",
});

(async () => {
  const response = await cohere.chat({
    message:
      "Write a title for a blog post about API design. Only output the title text.",
  });

  console.log(response.text);
})();
