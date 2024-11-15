const OBJECT_TITLES = [
  'Потрясающие хоромы',
  'Подземная лачуга',
  'Котовья нора',
  'Аппартаменты класса люкс',
  'Лучший отель в мире',
  'Жилье для неприхотливых',
  'Царские палаты',
  'Почти как дома',
  'Домик с уточкой',
  'Императорский дворец'
];

const OBJECT_DESCRIPTION = [
  'Что привлекает внимание, так это роскошная обстановка. Помещение довольно маленькое. Здесь довольно чисто и садиться за стол можно без боязни испачкать одежду.',
  'Неплохое заведение - тут явно можно хорошо отдохнуть. Помещение довольно маленькое. Видно, что тут убирают, но не часто.',
  'Заведение ничем не выделяется из десятков других. Помещение совсем небольшое. Здесь довольно чисто и садиться за стол можно без боязни испачкать одежду.',
  'Сразу бросается в глаза, что тут очень скудное убранство Помещение среднего размера. Обслуживание вполне приемлемое - по крайней мере за посетителями подметают крошки со столов.',
  'Помещение совсем небольшое. Обслуживание вполне приемлемое',
  'Здесь немного неряшливо, но на это можно закрыть глаза.',
  'Поговаривают в народе, что тут вроде бы древний могильник, да и место плохое. Также говорят, что из-под поверхности земли здесь, в некоторые ночи раздается странный гул.',
  'Старики рассказывают, что здесь находятся врата в древний лабиринт. Ходят слухи, что феи и странные порождения теней встречаются здесь чаще, чем хотелось бы.',
  'В книгах пишут, что великий храм прошлых дней возвышался тут в незапамятные времена. Кроме легенд и россказней местных, ничего особенного здесь никогда и не происходило.',
  'Люди приходят сюда искать исцеления, а большие празднества обычно совершаются в новолуние. Ходят слухи, что здесь порой можно услышать странные голоса.'
];

const IMAGES = [
  'https://sephellone.github.io/GlassHuts/img/hut/outside1.jpg',
  'https://sephellone.github.io/GlassHuts/img/hut/outside2.jpg',
  'https://sephellone.github.io/GlassHuts/img/hut/outside3.jpg',
  'https://sephellone.github.io/GlassHuts/img/hut/outside4.jpg',
  'https://sephellone.github.io/GlassHuts/img/hut/outside5.jpg',
  'https://sephellone.github.io/GlassHuts/img/hut/outside6.jpg',
]

function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}


window.addEventListener('load', () => {
  const url = window.location.href;

  const imageIndex = getRandomPositiveInteger(1, 6);

  const generateNewItem = () => {
    const title = getRandomArrayElement(OBJECT_TITLES);
    const description = getRandomArrayElement(OBJECT_DESCRIPTION);
    const image = getRandomArrayElement(IMAGES);

    const shareTitle = `В 2025 меня ждет переезд в: ${title}. Получи свое предсказание и ты!`;
    const options = {
      url: url,
      title: shareTitle,
      image: image,
    }
    const visual = { type: 'custom', text: '<button class="share__sn-button">VK</button>'};

    const okHref = encodeURI(`https://connect.ok.ru/offer?url=${url}&title=${shareTitle}&imageUrl=${image}`);
    const tgHref = encodeURI(`https://t.me/share/url?url=${url}&text=${shareTitle}`)

    const resultElem = document.querySelector(".share__result");
    const template = document.querySelector("#item-template").content.querySelector(".share__item");
    const newCard = template.cloneNode(true);
    newCard.querySelector(".share__item-title").textContent = title;
    newCard.querySelector(".share__item-description").textContent = description;
    newCard.querySelector(".share__sn-button.__ok").href = okHref;
    newCard.querySelector(".share__sn-button.__tg").href = tgHref;
    newCard.querySelector(".share__item-img").src = image;
    resultElem.innerHTML = "";
    resultElem.appendChild(newCard)
    document.querySelector(".vk-share-button").innerHTML = VK.Share.button(options, visual);
  }

  const generateButton = document.querySelector(".button");
  generateButton.addEventListener("click", () => {generateNewItem()})
})
