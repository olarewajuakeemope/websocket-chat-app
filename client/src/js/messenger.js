import { getCurrentUser, getUserToken } from '../utils/userUtils';

const Messenger = (doc, win, userName, userToken) => {
  const myName = userName || getCurrentUser();
  const token = userToken || getUserToken();

  // Begin DOM manipulation logic
  const messageFeed = doc.getElementById('message-feed');
  const messageInput = doc.getElementById('message-input');
  const submitButton = doc.getElementById('submit-message');

  const wScroll = () => {
    const heightToScroll = (130);
    const header = doc.getElementById('header');

    if (messageFeed.scrollTop > heightToScroll) {
      header.className = 'header header-scrolled';
      messageFeed.className = 'message-feed message-feed-scrolled';
    } else if (messageFeed.scrollTop < 1) {
      header.className = 'header header-unscrolled';
      messageFeed.className = 'message-feed';
    }
  };

  messageFeed.addEventListener('scroll', wScroll, false);

  wScroll();

  const addMessage = (author, message, color, dt) => {
    const hour = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
    const minutes = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
    const container = doc.createElement('div');
    const nameContainer = doc.createElement('div');
    const name = doc.createElement('h1');
    const bodyContainer = doc.createElement('div');
    const body = doc.createElement('p');
    const timeContainer = doc.createElement('div');
    const time = doc.createElement('p');

    name.innerText = author;
    name.style.color = color;
    nameContainer.className = 'message-name';
    nameContainer.appendChild(name);

    container.appendChild(nameContainer);

    body.innerText = message;
    bodyContainer.className = 'message-body';
    bodyContainer.appendChild(body);

    container.appendChild(bodyContainer);

    time.innerText = `Today ${hour}:${minutes}`;
    timeContainer.className = 'message-timestamp';
    timeContainer.appendChild(time);

    container.appendChild(timeContainer);

    container.classList.add('message');
    if (author === myName) {
      container.classList.add('message-to');
    } else {
      container.classList.add('message-from');
    }

    messageFeed.appendChild(container);
    messageFeed.scrollTop = messageFeed.scrollHeight;
  };

  // End DOM manipulation logic and begin websocket implementation
  win.WebSocket = win.WebSocket || win.MozWebSocket;

  if (!win.WebSocket) {
    messageInput.value = 'Sorry, but your browser doesn\'t support WebSocket.';
    return;
  }

  const connection = new WebSocket(`ws://127.0.0.1:8000/?token=${token}`);

  connection.onopen = () => {
    connection.send(myName);
    messageInput.removeAttribute('disabled');
  };

  connection.onerror = () => {
    messageInput.setAttribute('disabled', 'disabled');
    messageInput.value = 'Unable to communicate with the WebSocket server. Try logging in again';
  };

  connection.onmessage = (message) => {
    const json = JSON.parse(message.data);
    const { data, type } = json;

    if (type === 'history') {
      messageFeed.innerHTML = '';
      for (let i = 0; i < json.data.length; i += 1) {
        addMessage(data[i].author, data[i].text, data[i].color, new Date(data[i].time));
      }
      messageInput.focus();
    } else if (type === 'message') {
      messageInput.removeAttribute('disabled');
      addMessage(data.author, data.text, data.color, new Date(data.time));
      messageInput.focus();
    }
  };

  messageInput.onkeydown = (e) => {
    if (e.keyCode === 13) {
      const msg = e.target.value;
      if (!msg) {
        return;
      }
      connection.send(msg);
      e.target.value = '';
    }
  };

  submitButton.onclick = () => {
    if (messageInput.value) {
      connection.send(messageInput.value);
      messageInput.value = '';
    }
  };

  setInterval(() => {
    if (connection.readyState !== 1) {
      messageInput.setAttribute('disabled', 'disabled');
      messageInput.value = 'Unable to communicate with the WebSocket server.';
    }
  }, 3000);
};

export default Messenger;
