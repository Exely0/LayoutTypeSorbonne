/*
mon code à moi

var items = document.querySelectorAll(".nt-item");
var contents = document.querySelectorAll(".nt-content");

let canClick = true;

items.forEach(item => {
  item.addEventListener('click', function() {
    if (canClick === false) {
      return;
    }
    if (item.classList.contains('active')) {
      return;
    }

    items.forEach(otherItem => {
      otherItem.classList.remove('active');
    });

    setCanClickFalse();
    contents.forEach(content => {
      fadeOut(content);
    });

    setTimeout(() => {
      items.forEach(otherItem => {
        otherItem.classList.add('nt-collapse');
      });
      item.classList.remove('nt-collapse');
      fadeIn(item.children[1]);
    }, 500);

    item.classList.add('active');
});
});

async function setCanClickFalse(){
  canClick = false;
  console.log(canClick);
  await new Promise(resolve => setTimeout(resolve, 1000));
  canClick = true;
  console.log(canClick);
}

async function fadeOut(content) {
  content.classList.add('fade-out');
  await new Promise(resolve => setTimeout(resolve, 480));
  content.classList.add('nt-hidden');
  content.classList.remove('fade-out');
}

async function fadeIn(content) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  content.classList.remove('nt-hidden');
  content.classList.add('fade-in');
  await new Promise(resolve => setTimeout(resolve, 500));
  content.classList.remove('fade-in');
}

*/

//mon code à moi remanié par chat gpt

const items = document.querySelectorAll(".nt-item");
const contents = document.querySelectorAll(".nt-content");
let canClick = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function toggleItem(item) {
  if (!canClick || item.classList.contains('active')) {
    return;
  }

  canClick = false;

  items.forEach(otherItem => {
    otherItem.classList.remove('active');
  });

  contents.forEach(async content => {
    await fadeOut(content);
  });

  setTimeout(async () => {
    items.forEach(otherItem => {
      otherItem.classList.add('nt-collapse');
    });
    item.classList.remove('nt-collapse');
    await fadeIn(item.children[1]);
    item.classList.add('active');
  }, 500);

  setTimeout(async () => {
    canClick = true;
  }, 1000);
}

async function fadeOut(content) {
  content.classList.add('fade-out');
  await sleep(500);
  content.classList.add('nt-hidden');
  content.classList.remove('fade-out');
}

async function fadeIn(content) {
  await sleep(1000);
  content.classList.remove('nt-hidden');
  content.classList.add('fade-in');
  await sleep(500);
  content.classList.remove('fade-in');
}

items.forEach(item => {
  item.addEventListener('click', () => toggleItem(item));
});
