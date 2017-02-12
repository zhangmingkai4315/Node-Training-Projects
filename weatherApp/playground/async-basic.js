// console.log('Starting...');
// setTimeout(function() {
//     console.log('1000ms callback...');
// }, 1000);

// setTimeout(function() {
//     console.log('0s callback');
// }, 0);
// console.log("Finishing...");

// async callback event loop
const log = console.log.bind(this);
setImmediate(function A() {
  setImmediate(function B() {
    log(1);
    setImmediate(function D() { log(2); });
    setImmediate(function E() { log(3); });
  });
  setImmediate(function C() {
    log(4);
    setImmediate(function F() { log(5); });
    setImmediate(function G() { log(6); });
  });
});

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED');
}, 0);
