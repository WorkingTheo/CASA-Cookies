
const attachAcceptClickHandler = (document) => {
  const acceptButton = document.querySelector('[value="accept"][name="cookies"]');
  acceptButton.onclick = () => { console.log('CLICKED ACCEPT') };
}

const attachRejectClickHandler = (document) => {
  const rejectButton = document.querySelector('[value="reject"][name="cookies"]');
  rejectButton.onclick = () => { console.log('CLICKED REJECT') };
}

exports.attachAcceptClickHandler = attachAcceptClickHandler;
exports.attachRejectClickHandler = attachRejectClickHandler;
