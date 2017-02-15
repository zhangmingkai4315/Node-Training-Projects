
const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;
const {Users} = require('./utils/users');
const path = require('path');
const utils = require('./utils/utils');
const publicPath = path.join(__dirname,'../public');
const libPath = path.join(__dirname,'../node_modules');
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app)
const io = socketIO(server);
const users = new Users();
io.sockets.on('connection',(socket)=>{
    // 获得来源的ip地址
    let address = socket.request.connection.remoteAddress;
    let current_user
    socket.on('join',(params,fn)=>{
        if(!utils.isRealString(params.name) ||!utils.isRealString(params.room_name)){
            fn("请返回登入页面,用户名和房间名称必须被设置");
            return
        }
        socket.join(params.room_name);

        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room_name)
        current_user = users.getUser(socket.id);
        io.to(params.room_name).emit('update-userlist',users.getUsersList(params.room_name));

        socket.emit('welcome-message',utils.generateMessage(address,`欢迎加入 ${params.room_name} 聊天室`));
        // console.log(params.room_name);
        socket.broadcast.to(params.room_name).emit('welcome-message',utils.generateMessage(address,`${params.name} 加入了聊天室`));
        fn();
    });
    socket.on('disconnect',()=>{
        // io.emit　发送给所有的连接用户，而socket.broadcast.emit只会被除了当前socket以外的收到　　
        var user=users.removeUser(socket.id);
        console.log(user)
        if(user){
            io.to(user.room).emit('update-userlist',users.getUsersList(user.room));
            io.to(user.room).emit('left-message',
            utils.generateMessage(address,`${user.name} 离开了聊天室`));
        }
    });
    socket.on('create-message',(data,fn)=>{
        if(current_user){
            io.to(current_user.room).emit('new-message',utils.generateMessage(current_user.name,data.text));
        }
        fn('ack');
    });

    socket.on('create-location-message',(data,fn)=>{
        if(current_user){
            let location_data = utils.generateLocationMessage(current_user.name,data.location);
            io.to(current_user.room).emit('new-location-message',location_data);
        }
        fn('ack');
    });
});

app.use(express.static(publicPath));
app.use('/lib',express.static(libPath));


server.listen(PORT,(err)=>{
    if(err){
        console.log('Error:',err);
    }else{
        console.log(`server is running at localhost:${PORT}`)
    }
});
