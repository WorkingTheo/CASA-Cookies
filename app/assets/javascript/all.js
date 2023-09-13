//const { attachAcceptClickHandler, attachRejectClickHandler } = require('./cookie-message');

const attachAcceptClickHandler = (document) => {
  const acceptButton = document.querySelector('[value="accept"][name="cookies"]');
  acceptButton.onclick = () => { console.log('CLICKED ACCEPT') };
}

const attachRejectClickHandler = (document) => {
  const rejectButton = document.querySelector('[value="reject"][name="cookies"]');
  rejectButton.onclick = () => { console.log('CLICKED REJECT') };
}

function initAll() {
  console.log('init');
  attachAcceptClickHandler(document);
  attachRejectClickHandler(document);

  //document.querySelector('[value="reject"][name="cookies"]')
}

initAll();

// exports.initAll = initAll;
