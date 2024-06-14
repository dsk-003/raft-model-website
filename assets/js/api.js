async function getAnswerFromAPI(question) {
    const apiUrl = 'https://raft-alta-main.victoriouswave-6fcdb8d5.swedencentral.azurecontainerapps.io/answer/';

    try {
        console.log('Sending question to API:', question);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user_question: question })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await response.json();
        console.log('Received response from API:', data);
        return data.answer;
    } catch (error) {
        console.error('Error getting answer from API:', error);
        return 'Sorry, something went wrong while processing your question.';
    }
}

function getInputValue() {
    const inputElement = document.getElementById('tynChatInput');
    if (!inputElement) {
        console.error('Input element not found');
        return '';
    }
    const value = inputElement.innerText.trim();
    console.log('Input value:', value);
    return value;
}

function displayResponse(response, isUser = false) {
    console.log('Displaying response:', response, 'User message:', isUser);
    const chatBodyElement = document.getElementById('tynChatBody');
    if (!chatBodyElement) {
        console.error('Chat body element not found');
        return;
    }
    const responseElement = document.createElement('div');
    responseElement.className = isUser ? 'tyn-reply-item outgoing outmsg' : 'tyn-reply-item incoming inmsg';
    const displayText = isUser ? `${response}` : `${response}`;

    responseElement.innerHTML = `
        <div class="tyn-reply-group">
            <div class="tyn-reply-bubble">
                <div class="tyn-reply-text"><span class="opanswer">${response}</span></div>
            </div>
        </div>
    `;
    chatBodyElement.appendChild(responseElement);
    document.getElementById('tynChatInput').textContent ='';
    console.log(responseElement);
    chatBodyElement.scrollTop = chatBodyElement.scrollHeight;  // Auto scroll to the bottom


    //document.getElementById("tynChatBody").innerHTML = responseElement;
}

async function handleSendRequest() {
    const question = getInputValue();
    if (!question) {
        console.log('No question entered');
        return; // Do nothing if input is empty
    }
    displayResponse(`${question}`, true);  // Display user's question
    const response = await getAnswerFromAPI(question);
    displayResponse(response);
}

function setupSendButton() {
    const sendButton = document.getElementById('tynChatSend');
    if (!sendButton) {
        console.error('Send button not found');
        return;
    }
    sendButton.addEventListener('click', handleSendRequest);
}

// Initialize the send button event listener when the window loads
window.onload = setupSendButton;
