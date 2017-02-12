const fs = require('fs');
const argv = require('yargs').argv;
const FILENAME='notes.txt';
const fetchNotes = (fileName)=>{
    try{
        let data = fs.readFileSync(fileName);
        return JSON.parse(data);
    }catch(e){
        return [];
    }
};

const saveNotes = (notes,fileName)=>{
    fs.writeFileSync(fileName,JSON.stringify(notes,null,2));
};

const addNote = (title,body)=>{
    let notes = fetchNotes(FILENAME);
    let obj ={
        title,body
    }
    if(notes.filter(n=>n.title===title).length===0){
        notes.push(obj);
        saveNotes(notes,FILENAME);
    }else{
        console.log('Error:Duplication Error');
    }
};

const listNote = ()=>{
    console.log(fetchNotes(FILENAME));
};

switch(argv.command){
    case 'add':
    addNote(argv.title,argv.body);
    break;
    case 'list':
    listNote();
    break;
    default:
    console.log('Not support commands');
}

// zhangmingkaideMacBook-Pro:basic zhangmingkai$ node notes.js --command=add --title='first notes' --body='javascript is asesome'
// zhangmingkaideMacBook-Pro:basic zhangmingkai$ node notes.js --command=add --title='first notes' --body='javascript is asesome'
// Error:Duplication Error
// zhangmingkaideMacBook-Pro:basic zhangmingkai$ node notes.js --command=add --title='seconds notes' --body='javascript is asesome'
// zhangmingkaideMacBook-Pro:basic zhangmingkai$ node notes.js --command=list
// [ { title: 'first notes', body: 'javascript is asesome' },
//   { title: 'seconds notes', body: 'javascript is asesome' } ]



