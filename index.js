import keys from './keys.js';

const createKey = (key) => {
  const keyboardKey = document.createElement('div');
  keyboardKey.classList.add('keyboard__key', key[0]);
  const keyboardKeyEn = document.createElement('span');
  keyboardKeyEn.classList.add('en');
  const keyboardKeyRu = document.createElement('span');
  keyboardKeyRu.classList.add('ru', 'hidden');
  Object.entries(key[1].en).forEach(element => {
    const content = document.createElement('span');
    content.textContent = element[1];
    if (element[0] === 'lowerCase') {
      content.classList.add(element[0]);
    } else {
      content.classList.add(element[0], 'hidden');
    }
    keyboardKeyEn.append(content);
  });
  Object.entries(key[1].ru).forEach(element => {
    const content = document.createElement('span');
    content.textContent = element[1];
    if (element[0] === 'lowerCase') {
      content.classList.add(element[0]);
    } else {
      content.classList.add(element[0], 'hidden');
    }
    keyboardKeyRu.append(content);
  });
  keyboardKey.append(keyboardKeyRu, keyboardKeyEn);

  return keyboardKey;
};

const init = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  Object.entries(keys)
    .forEach(key => {
      keyboard.append(createKey(key));
    });
  document.body.prepend(keyboard);
};

init();
