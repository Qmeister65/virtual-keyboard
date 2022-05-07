import keys from './keys.js';

let shiftState = false;
let capsState = false;
let langState = 'en';

const clickHandler = (event) => {
  event.preventDefault();
  const key = event.currentTarget.closest('.keyboard__key');
  const textArea = document.querySelector('.textarea');
  const cur = key.querySelector('.current');
  const textContent = cur.getElementsByClassName('shown')[0].textContent;
  const keyboardArray = document.querySelectorAll('.keyboard__key');

  if (textContent === 'Backspace') {
    if (event.type === 'mousedown') {
      textArea.value = textArea.value.slice(0, textArea.value.length - 1);
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'Tab') {
    if (event.type === 'mousedown') {
      textArea.value += '\t';
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
      textArea.value += '\n';
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (textContent === 'Del') {
    if (event.type === 'mousedown') {
      key.classList.add('active');
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
        element.querySelector('.ru').classList.toggle('hidden');
        element.querySelector('.ru').classList.toggle('current');
        element.querySelector('.en').classList.toggle('hidden');
        element.querySelector('.en').classList.toggle('current');
      });
      key.classList.add('active');
    } else {
      key.classList.remove('active');
    }
  } else if (event.type === 'mousedown') {
    document.querySelector('.textarea').value += cur.getElementsByClassName('shown')[0].textContent;
    key.classList.add('active');
  } else {
    key.classList.remove('active');
  }
};

const createKey = (key) => {
  const keyboardKey = document.createElement('div');
  keyboardKey.classList.add('keyboard__key', key[0]);
  const keyboardKeyEn = document.createElement('span');
  keyboardKeyEn.classList.add('en', 'current');
  const keyboardKeyRu = document.createElement('span');
  keyboardKeyRu.classList.add('ru', 'hidden');
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
      keyboard.append(createKey(key));
    });
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  document.body.prepend(textarea, keyboard);
};

init();
