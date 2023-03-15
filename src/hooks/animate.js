// var i = 0;
// function animate(obj, target, callback) {
//     obj.timer = setInterval(() => {
//         var speed = 3;
//         if (obj.style.transform >= 'translateY(-' + target + 'px)') {
//             clearInterval(obj.timer);
//             i=0
//             if (callback) {
//                 callback();
//             }
//         }
//         i += speed
//         obj.style.transform = 'translateY(-' + i + 'px)';
//     }, 15);
// }
// export { animate }