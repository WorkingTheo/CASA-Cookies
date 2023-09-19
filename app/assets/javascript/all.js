function setCookie(name,value,days) {
  console.log('inside setCookie');
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  console.log('set cookie: ', name);
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const attachAcceptClickHandler = (document) => {
  const acceptButton = document.querySelector('[value="accept"][name="cookies"]');
  acceptButton.onclick = () => { 
    console.log('CLICKED ACCEPT');
    setCookie('cookieChoiceMade', 'accept', 1);
  };
}

const attachRejectClickHandler = (document) => {
  const rejectButton = document.querySelector('[value="reject"][name="cookies"]');
  rejectButton.onclick = () => { 
    console.log('CLICKED REJECT');
    setCookie('cookieChoiceMade', 'reject', 1);
  };
}

function initAll() {
  console.log('init');
  attachAcceptClickHandler(document);
  attachRejectClickHandler(document);

  //document.querySelector('[value="reject"][name="cookies"]')
}

initAll();

// exports.initAll = initAll;
