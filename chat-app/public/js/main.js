var socket = io();

// es6在最新版chrome中可以正常运行，但是在其他浏览器中最好使用babel转换
var params = parseQueryString(window.location.search);
socket.on('connect',()=>{
    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href = '/login.html'
        }else{

        }
    })
    $('[name=message]').removeAttr("disabled");
});
socket.on('disconnect',()=>{
    // console.error('Disconnected to server');
    show_sys_message('Disconnected to server');
    $('[name=message]').attr("disabled","disabled")
});

socket.on('welcome-message',(data)=>{
    show_sys_message(data.text)
});

socket.on('left-message',(data)=>{
    show_sys_message(data.text)
});
socket.on('update-userlist',(data)=>{
    // 用户列表显示在页面左边
    // console.log(data);
     $('.users').html('');
    var ol =$('<ol></ol>');
    data.forEach(function(u){
        ol.append($('<li></li').text(u))
    });
    $('.users').append(ol);
});
socket.on('new-message',(data)=>{
    console.info('Receive the new message from server:',data);
    show_message(data);
});

socket.on('new-location-message',(data)=>{
    console.info('Receive the new location message from server:',data);
    show_location_message(data);
});

function scrollToBottom(){
    var messagesBox = $('#messages');
    var clientHeight = messagesBox.prop('clientHeight');
    var scrollTop = messagesBox.prop('scrollTop');
    var scrollHeight = messagesBox.prop('scrollHeight');
    var newMessage = messagesBox.children('li:last-child');
    var newMessageHeight = newMessage.prop('scrollHeight');
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        messagesBox.scrollTop(scrollHeight);
    }
}


function show_sys_message(message){
    var template = $('#system-info-template').html();
    var html = Mustache.render(template,{
        text:message,
    });
    $('#messages').append(html);
    
}
function show_message(data){
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        time:moment(data.createdAt).format('kk:mm:ss'),
        text:data.text,
        user:data.from
    });
    $('#messages').append(html);
    scrollToBottom();
}

function show_location_message(data){
    var template = $('#location-template').html();
    var html = Mustache.render(template,{
        time:moment(data.createdAt).format('kk:mm:ss'),
        url:data.url,
        user:data.from
    });
    $('#messages').append(html);
}
function send_message(message){
    var message_data ={
         from:'User',
         text:message
    }
    socket.emit('create-message',message_data,function(data){
        // 服务器ack之后显示在客户端的界面上
    });
}

function send_location_message(data){
    var location_data={
        from:'User',
        location:data
    };
    socket.emit('create-location-message',location_data,function(data){
        // 服务器ack之后再去显示在客户端的界面上
        // show_self_message(data);
        // show_location_message(location_data,self)
    });
}

$('#message-form').on('submit',function(e){
    e.preventDefault();
    var message =$('[name=message]').val();
    // 判断是否为空或者包含无效字符
    if(message){
        send_message($('[name=message]').val());
        // 清除输入
        $('[name=message]').val("");
    }
});
var location_btn = $('#send-location-btn');
location_btn.on('click',function(){
    location_btn.attr('disabled','disabled');
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function(position) {
            location_btn.removeAttr('disabled','disabled');
            send_location_message({
                 lat:position.coords.latitude,
                 lng:position.coords.longitude
            }, function error(err) {
               alert('无法获得位置信息',err);
            });
        });
    } else {
        location_btn.attr('disabled','disabled');
    }
})
