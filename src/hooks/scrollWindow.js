function animation(obj, target, callback) {
  clearInterval(obj.timer);
  // clearInterval(clear)
  // var clear = setTimeout(() => {
  //   clearInterval(obj.timer);
  // }, 400);
  obj.timer = setInterval(() => {
    var speed = 20;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

    if (Math.abs(obj.scrollTop - target) <=Math.abs(speed)) {
      clearInterval(obj.timer);
      if (callback) {
        callback();
      }
    }
    obj.scrollTop += speed;
  }, 10);
}
export { animation }