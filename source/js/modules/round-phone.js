const isQ3 = (x, y) => {
  return (x <= 0 && y >= 0) ? true : false
};

const getAngle = (x, y) => {
  let angle = 0;
  if(isQ3(x,y)) {
    angle = Math.round((2 * Math.PI - Math.atan2(y,x)) * 180 / Math.PI);
  } else {
    angle = Math.round((- Math.atan2(y,x)) * 180 / Math.PI);
  }

  return angle;
};

const isInside = (x, y, elem) => {
  const boundingBox = elem.getBoundingClientRect();
  if (x >= boundingBox.x
    && x <= boundingBox.x + boundingBox.width
    && y >= boundingBox.y
    && y <= boundingBox.y + boundingBox.height) {
      return true;
  } else {
    return false;
  }
};

const initRoundPhone = () => {
  const roundParent = document.querySelector('[data-round-phone="parent"]');

  if(!roundParent) {
    return
  }

  const inputField = roundParent.querySelector('[data-round-phone="input"]');
  const plane = roundParent.querySelector('[data-round-phone="plane"]');
  const round = roundParent.querySelector('[data-round-phone="round"]');
  const stop = roundParent.querySelector('[data-round-phone="stop"]');

  if(!inputField || !plane || !round || !stop) {
    return
  }

  let button;
  let buttonNumber;
  let x0, y0, x1, y1, x2, y2, angle1, angle2, rotateAngle, rotateTime;

  const mouseMoveHandler = (evt) => {
    x2 = evt.clientX - x0;
    y2 = evt.clientY - y0;
    angle2 = getAngle(x2, y2);

    rotateAngle = angle1 - angle2;

    if (rotateAngle < 0) {
      return
    }

    if (rotateAngle > 323) {
      rotateAngle = 323;
    }
    round.style.setProperty('--angle', `${rotateAngle}deg`);
  }

  const mouseupHandler = (evt) => {
    if (!evt.target.closest('[data-round-phone="plane"]')) {
      return
    }

    if (isInside(evt.clientX, evt.clientY, stop)) {
      inputField.value += buttonNumber;
    }
    document.removeEventListener('mousemove', mouseMoveHandler);

    rotateTime = rotateAngle * 4;
    round.style.setProperty('--time', `${rotateTime}ms`);
    round.classList.add('rotated');
    setTimeout(() => {
      round.classList.remove('rotated');
      round.style.setProperty('--time', '0');
      round.style.setProperty('--angle', '0');
    }, rotateTime);
  };

  round.addEventListener('mousedown', (evt) => {
    button = evt.target;
    if(button.dataset.roundPhone === 'round') {
      return
    }
    buttonNumber = button.dataset.roundPhone;

    const planeSizes = plane.getBoundingClientRect();

    x0 = planeSizes.x + planeSizes.width / 2;
    y0 = planeSizes.y + planeSizes.height / 2;

    x1 = evt.clientX - x0;
    y1 = evt.clientY - y0;

    angle1 = getAngle(x1, y1);

    document.addEventListener('mousemove', mouseMoveHandler);
  });

  document.addEventListener('mouseup', mouseupHandler);

  roundParent.querySelector('.phones__reset').addEventListener('click', () => {
    inputField.value ='';
  })

}

export {initRoundPhone};
