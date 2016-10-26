

export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export const randomRange = (r1, r2) => {
    r1 = Math.ceil(r1);
    r2 = Math.floor(r2);
    return Math.floor(Math.random() * (r2 - r1 + 1)) + r1;
}

export const validate = (str) => {
  let patt = new RegExp(/^[a-zA-Z]+$/g );
  return patt.test(str);
}