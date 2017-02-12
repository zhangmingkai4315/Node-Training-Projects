const fs = require('fs');

const titleOptions ={
    discribe:'Title of the new note',
    demand:true,
    alias:'t'             
}
const argv = require('yargs')
            .command('add','add a new notes',{
                title:titleOptions,
                body:{
                    discribe:'Body of the new note',
                    demand:true,
                    alias:'b'
                }
            })
            .command('list','list all notes')
            .command('read','read a note',{
                title:titleOptions
            })
            .help()
            .argv;



// bash-3.2$ node basic/notes.js --help
// 命令：
//   add   add a new notes
//   list  list all notes

// 选项：
//   --help  显示帮助信息                                                    [布尔]


// bash-3.2$ node basic/notes.js add --help
// basic/notes.js add

// 选项：
//   --help       显示帮助信息                                               [布尔]
//   --title, -t                                                             [必需]
//   --body, -b                                                              [必需]



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



