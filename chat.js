const chatList = document.getElementById("chat-list");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

const openaiApiKey = "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";
const engine = "davinci";

chatSend.addEventListener("click", function() {
  const userInput = chatInput.value;
  addMessageToChat("user", userInput);
  getChatbotResponse(userInput);
  chatInput.value = "";
});

async function getChatbotResponse(userInput) {
  const prompt = `Conversation with an EV Charging Assistant:\nUser: ${userInput}\nBot:`;
  const maxTokens = 50;
  const temperature = 0.7;
  const topP = 1;
  const n = 1;
  const stop = "\n";
  
  const response = await fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: topP,
      n: n,
      stop: stop
    })
  });
  
  const data = await response.json();
  const chatbotResponse = data.choices[0].text.trim();
  addMessageToChat("bot", chatbotResponse);
}

function addMessageToChat(sender, message) {
  const bubbleClass = (sender === "user") ? "chat-user-bubble" : "chat-bot-bubble";
  const bubbleHTML = `<li class="${bubbleClass}">${message}</li>`;
  chatList.innerHTML += bubbleHTML;
  chatList.scrollTop = chatList.scrollHeight;
}
