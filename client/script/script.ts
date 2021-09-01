const joinRoomBUtton = document.getElementById('room-button');
const messageInput = document.getElementById(
  'message-input'
) as HTMLInputElement;
const roomInput = document.getElementById('room-input') as HTMLInputElement;
const form = document.getElementById('form');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message === '') return;
  displayMessage(message);
  messageInput.value = '';
});

joinRoomBUtton?.addEventListener('click', () => {
  const room = roomInput.value;
});

const displayMessage = (message: string) => {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container')!.append(div);
};
