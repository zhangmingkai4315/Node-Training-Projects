// console.log(module);
// Module {
//   id: '/Volumes/MacintoshHD/github/Node-Training-Projects/basic/my_module.js',
//   exports: {},
//   parent: 
//    Module {
//      id: '.',
//      exports: {},
//      parent: null,
//      filename: '/Volumes/MacintoshHD/github/Node-Training-Projects/basic/app.js',
//      loaded: false,
//      children: [ [Circular] ],
//      paths: 
//       [ '/Volumes/MacintoshHD/github/Node-Training-Projects/basic/node_modules',
//         '/Volumes/MacintoshHD/github/Node-Training-Projects/node_modules',
//         '/Volumes/MacintoshHD/github/node_modules',
//         '/Volumes/MacintoshHD/node_modules',
//         '/Volumes/node_modules',
//         '/node_modules' ] },
//   filename: '/Volumes/MacintoshHD/github/Node-Training-Projects/basic/my_module.js',
//   loaded: false,
//   children: [],
//   paths: 
//    [ '/Volumes/MacintoshHD/github/Node-Training-Projects/basic/node_modules',
//      '/Volumes/MacintoshHD/github/Node-Training-Projects/node_modules',
//      '/Volumes/MacintoshHD/github/node_modules',
//      '/Volumes/MacintoshHD/node_modules',
//      '/Volumes/node_modules',
//      '/node_modules' ] }
module.exports = (...args)=>{
    console.log(`The length is ${args.length}`)
    return args.reduce((a,sum)=>{return sum+a;});
}