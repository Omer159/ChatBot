const chatInput = document.querySelector(".chat-input textarea");
const sendChatButton = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");
const API_KEY = "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";
const chatbotToggler = document.querySelector(".chatbot-toggler") 


const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector('p' )

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {role: "system", content: userMessage},
        {"role": "user", "content": chatInput.value.trim()}
      ]
    })
  };

  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
      messageElement.textContent = data.choices[0].message.content
    }).catch(error => {
        messageElement.classList.add('error')
        messageElement.textContent = "Bro, I'm facing some issues in fetching data";
    }).finally(() => chatBox.scrollTo(0,chatBox.scrollHeight));
};

const createChatLi = (message, className) => {
  const chatLI = document.createElement("li");
  chatLI.classList.add("chat", className);
  const chatContent = className === "outgoing"
    ? `<p></p>`
    : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLI.innerHTML = chatContent;
  chatLI.querySelector("p").textContent = message
  return chatLI;

};

let userMessage;
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = ''
  
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
  chatBox.scrollTo(0,chatBox.scrollHeight)

  setTimeout(() => {
    const incomingChatLi = createChatLi("Processing...", "incoming")
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0,chatBox.scrollHeight)
    generateResponse(incomingChatLi); 
 
}, 600);

};
sendChatButton.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click" , () => document.body.classList.toggle("show-chatbot")) 

// chatInput.addEventListener("keydown"), (e)=>{
//     if(e.key === "Enter" && !e.shiftkey && window.innerWidth > 800){
//         e.preventDefault(
//             handleChat()
//         )
//     }
//     chatInput.style.height = `${inputinithe}`
// }
