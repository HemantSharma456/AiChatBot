const key = "AIzaSyBjz9NShIV8-GSqD7A5ty8rrRefGuBnAaE";
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const container = document.getElementById("reply");
const form = document.getElementById("form");

form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    const prompt = input.value;
    container.scrollTop = container.scrollHeight;
    api().then((data) => {
        input.value = "";
        const userDiv = document.createElement("div");
        userDiv.className = "user";
        userDiv.textContent = "You: "+prompt;
        container.appendChild(userDiv);

        const reply = data;

        const botDiv = document.createElement("div");
        botDiv.className = "bot";
        botDiv.textContent = "Bot: "+data;
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;

    }).catch((error)=>{
        console.log(error);
    })
}, false)

async function api(){
    const prompt = document.getElementById("input").value;
    const api = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "contents": [
                {
                    "parts": [
                        {
                            "text": `${prompt}`
                        }
                    ]
                }
            ]
        })
    })
    const data = await api.json();
    const text = data.candidates[0].content.parts[0].text;
    return text;
}

