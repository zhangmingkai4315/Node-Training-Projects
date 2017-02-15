// [{
//     id:'1',
//     name:'',
//     room:'',
// }];

class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        let user = {id,name,room}
        this.users.push(user);
        return user
    }
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter(u=>u.id!==id);
            return user
        }else{
            return null
        }
    }
    getUser(id){
        let list = this.users.filter((u)=>u.id===id);
        if(list&&list.length>0){
            return list[0]
        }else{
            return null;
        }
    }
    getUsersList(room){
        return this.users.filter((u)=>u.room===room).map(u=>u.name);
    }
}

module.exports = {Users};