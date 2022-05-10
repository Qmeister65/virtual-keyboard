import keys from './keys.js';

let shiftState = false;
let capsState = false;
let langState = localStorage.getItem('langState') || 'en';

const clickHandler = (event) => {
  event.preventDefault();
  const key = event.currentTarget.closest('.keyboard__key');
  const textArea = document.querySelector('.textarea');
  const cur = key.querySelector('.current');
  const textContent = cur.getElementsByClassName('shown')[0].textContent;
  const keyboardArray = document.querySelectorAll('.keyboard__key');
  let position = textArea.selectionStart;
  if (textContent === 'Backspace') {
    if (event.type === 'mousedown') {
      if (position > 0 && textArea.selectionStart === textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, position - 1)
          + textArea.value.slice(position, textArea.value.length);
        textArea.selectionStart = position - 1;
        textArea.selectionEnd = position - 1;
      }
      if (textArea.selectionStart !== textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, textArea.selectionStart)
          + textArea.value.slice(textArea.selectionEnd, textArea.value.length);
        textArea.selectionStart = position;
        textArea.selectionEnd = position;
        key.classList.add('active');
      } else {
        key.classList.remove('active');
      }
    }
  } else if (textContent === 'Tab') {
    if (event.type === 'mousedown') {
      textArea.value = textArea.value.slice(0, position) + '\t'
        + textArea.value.slice(position, textArea.value.length);
      position += 1;
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'CapsLock') {
    if (event.type === 'mousedown') {
      key.classList.toggle('active');
      capsState = !capsState;
      keyboardArray.forEach(element => {
        if (capsState && !shiftState) {
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
        }
        if (!capsState && !shiftState) {
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
        }
        if (capsState && shiftState) {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.add('shown');
              el.classList.remove('hidden');
            });
        }
        if (!capsState && shiftState) {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });
        }
      });
    }
  } else if (textContent === 'Shift') {
    if (event.type === 'mousedown' && !shiftState) {
      shiftState = !shiftState;
      key.classList.add('active');
      if (!capsState) {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
        });
      } else {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
        });
      }
    } else if ((event.type === 'mouseup' && shiftState) || (event.type === 'mouseout'
      && event.target === key && shiftState)) {
      shiftState = !shiftState;
      key.classList.remove('active');
      if (!capsState) {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
        });
      } else {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
        });
      }
    }
  } else if (textContent === 'Alt') {
    if (event.type === 'mousedown') {
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'Ctrl') {
    if (event.type === 'mousedown') {
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'Enter') {
    if (event.type === 'mousedown') {
      textArea.value = textArea.value.slice(0, position) + '\n'
        + textArea.value.slice(position, textArea.value.length);
      position += 1;
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'Del') {
    if (event.type === 'mousedown') {
      key.classList.add('active');
      if (position >= 0 && textArea.selectionStart === textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, position)
          + textArea.value.slice(position + 1, textArea.value.length);
      }
      if (textArea.selectionStart !== textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, textArea.selectionStart)
          + textArea.value.slice(textArea.selectionEnd, textArea.value.length);
      }
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'Win') {
    if (event.type === 'mousedown') {
      if (langState === 'en') {
        langState = 'ru';
      } else {
        langState = 'en';
      }
      keyboardArray.forEach(element => {
        element.querySelector('.ru')
          .classList
          .toggle('hidden');
        element.querySelector('.ru')
          .classList
          .toggle('current');
        element.querySelector('.en')
          .classList
          .toggle('hidden');
        element.querySelector('.en')
          .classList
          .toggle('current');
      });
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (event.type === 'mousedown') {
    textArea.value = textArea.value.slice(0, position) + cur.getElementsByClassName('shown')[0].textContent
        + textArea.value.slice(position, textArea.value.length);
    position += 1;
    textArea.selectionStart = position;
    textArea.selectionEnd = position;
    key.classList.add('active');
  } else {
    key.classList.remove('active');
  }
};

const pressHandler = (event) => {
  event.preventDefault();
  const textArea = document.querySelector('.textarea');
  let position = textArea.selectionStart;
  const keyboardArray = document.querySelectorAll('.keyboard__key');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (event.type === 'keydown') {
      shiftState = !shiftState;
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
      if (!capsState) {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
        });
      } else {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
        });
      }
    } else if (event.type === 'keyup') {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
      shiftState = !shiftState;
      if (!capsState) {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
        });
      } else {
        keyboardArray.forEach(element => {
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
        });
      }
    }
  } else if (event.code === 'CapsLock') {
    if (event.type === 'keydown') {
      document.querySelector(`.${event.code}`)
        .classList
        .toggle('active');
      capsState = !capsState;
      keyboardArray.forEach(element => {
        if (capsState && !event.shiftKey) {
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
        }
        if (!capsState && !event.shiftKey) {
          element.querySelectorAll('.caps')
            .forEach(el => {
              el.classList.add('hidden');
              el.classList.remove('shown');
            });
          element.querySelectorAll('.lowerCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
        }
        if (capsState && event.shiftKey) {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.add('shown');
              el.classList.remove('hidden');
            });
        }
        if (!capsState && event.shiftKey) {
          element.querySelectorAll('.upperCase')
            .forEach(el => {
              el.classList.remove('hidden');
              el.classList.add('shown');
            });
          element.querySelectorAll('.shiftCaps')
            .forEach(el => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });
        }
      });
    }
  } else if (event.code === 'AltLeft' || event.code === 'AltRight' || event.code === 'ControlLeft' || event.code === 'ControlRight') {
    if (event.type === 'keydown') {
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
    } else {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
    }
  } else if (event.code === 'Enter') {
    if (event.type === 'keydown') {
      textArea.value = textArea.value.slice(0, position) + '\n'
        + textArea.value.slice(position, textArea.value.length);
      position += 1;
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
    } else {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
    }
  } else if (event.code === 'Delete') {
    if (event.type === 'keydown') {
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
      if (position >= 0 && textArea.selectionStart === textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, position)
          + textArea.value.slice(position + 1, textArea.value.length);
      }
      if (textArea.selectionStart !== textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, textArea.selectionStart)
          + textArea.value.slice(textArea.selectionEnd, textArea.value.length);
      }
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
    } else {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
    }
  } else if (event.code === 'Backspace') {
    if (event.type === 'keydown') {
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
      if (position > 0 && textArea.selectionStart === textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, position - 1)
          + textArea.value.slice(position, textArea.value.length);
        textArea.selectionStart = position - 1;
        textArea.selectionEnd = position - 1;
      }
      if (textArea.selectionStart !== textArea.selectionEnd) {
        textArea.value = textArea.value.slice(0, textArea.selectionStart)
          + textArea.value.slice(textArea.selectionEnd, textArea.value.length);
        textArea.selectionStart = position;
        textArea.selectionEnd = position;
      }
    } else {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
    }
  } else if (event.metaKey) {
    if (event.type === 'keydown') {
      if (langState === 'en') {
        langState = 'ru';
      } else {
        langState = 'en';
      }
      keyboardArray.forEach(element => {
        element.querySelector('.ru')
          .classList
          .toggle('hidden');
        element.querySelector('.ru')
          .classList
          .toggle('current');
        element.querySelector('.en')
          .classList
          .toggle('hidden');
        element.querySelector('.en')
          .classList
          .toggle('current');
      });
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
    } else {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
    }
  } else if (event.code === 'Tab') {
    if (event.type === 'keydown') {
      textArea.value = textArea.value.slice(0, position) + '\t'
        + textArea.value.slice(position, textArea.value.length);
      position += 1;
      textArea.selectionStart = position;
      textArea.selectionEnd = position;
      document.querySelector(`.${event.code}`)
        .classList
        .add('active');
    } else {
      document.querySelector(`.${event.code}`)
        .classList
        .remove('active');
    }
  } else if (event.type === 'keydown') {
    document.querySelector(`.${event.code}`)
      .classList
      .add('active');
    textArea.value = textArea.value.slice(0, position) + document.querySelector(`.${event.code}`)
      .querySelector('.current')
      .getElementsByClassName('shown')[0].textContent
      + textArea.value.slice(position, textArea.value.length);
    position += 1;
    textArea.selectionStart = position;
    textArea.selectionEnd = position;
  } else if (event.type === 'keyup') {
    document.querySelector(`.${event.code}`)
      .classList
      .remove('active');
  }
  if (event.ctrlKey && event.altKey && event.type === 'keydown') {
    if (langState === 'en') {
      langState = 'ru';
    } else {
      langState = 'en';
    }
    keyboardArray.forEach(element => {
      element.querySelector('.ru')
        .classList
        .toggle('hidden');
      element.querySelector('.ru')
        .classList
        .toggle('current');
      element.querySelector('.en')
        .classList
        .toggle('hidden');
      element.querySelector('.en')
        .classList
        .toggle('current');
    });
  }
};

const createKey = (key, lang) => {
  const keyboardKey = document.createElement('div');
  keyboardKey.classList.add('keyboard__key', key[0]);
  const keyboardKeyEn = document.createElement('span');

  const keyboardKeyRu = document.createElement('span');
  if (lang === 'en') {
    keyboardKeyEn.classList.add('en', 'current');
    keyboardKeyRu.classList.add('ru', 'hidden');
  } else {
    keyboardKeyEn.classList.add('en', 'hidden');
    keyboardKeyRu.classList.add('ru', 'current');
  }

  Object.entries(key[1].en)
    .forEach(element => {
      const content = document.createElement('span');
      content.textContent = element[1];
      if (element[0] === 'lowerCase') {
        content.classList.add(element[0], 'shown');
      } else {
        content.classList.add(element[0], 'hidden');
      }
      keyboardKeyEn.append(content);
    });
  Object.entries(key[1].ru)
    .forEach(element => {
      const content = document.createElement('span');
      content.textContent = element[1];
      if (element[0] === 'lowerCase') {
        content.classList.add(element[0], 'shown');
      } else {
        content.classList.add(element[0], 'hidden');
      }
      keyboardKeyRu.append(content);
    });
  keyboardKey.append(keyboardKeyRu, keyboardKeyEn);
  keyboardKey.addEventListener('mousedown', clickHandler);
  keyboardKey.addEventListener('mouseup', clickHandler);
  keyboardKey.addEventListener('mouseout', clickHandler);
  return keyboardKey;
};

const init = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  Object.entries(keys)
    .forEach(key => {
      keyboard.append(createKey(key, langState));
    });
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  const langSwitchInfo = document.createElement('p');
  langSwitchInfo.textContent = 'Для переключения языка используется metaKey (Win)';
  const osInfo = document.createElement('p');
  osInfo.textContent = 'Клавиатура создана в ОС Windows';
  document.body.prepend(textarea, keyboard, langSwitchInfo, osInfo);
};

init();
window.addEventListener('keydown', pressHandler);
window.addEventListener('keyup', pressHandler);
window.addEventListener('keypress', pressHandler);
window.addEventListener('beforeunload', () => localStorage.setItem('langState', langState));
