document.addEventListener('DOMContentLoaded', () => {
  const fontsizeInput = document.getElementById('fontsize');
  const fontcolorInput = document.getElementById('fontcolor');
  const saveButton = document.querySelector('input[type="submit"]');

  // Load preferences from cookies
  function loadPreferences() {
    const fontsize = getCookie('fontsize');
    const fontcolor = getCookie('fontcolor');

    if (fontsize) {
      fontsizeInput.value = fontsize;
      document.body.style.fontSize = fontsize + 'px';
    }
    if (fontcolor) {
      fontcolorInput.value = fontcolor;
      document.body.style.color = fontcolor;
    }
  }

  // Save preferences to cookies
  function savePreferences() {
    const fontsize = fontsizeInput.value;
    const fontcolor = fontcolorInput.value;

    setCookie('fontsize', fontsize, 365);
    setCookie('fontcolor', fontcolor, 365);

    document.body.style.fontSize = fontsize + 'px';
    document.body.style.color = fontcolor;
  }

  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    savePreferences();
  });

  loadPreferences();
});