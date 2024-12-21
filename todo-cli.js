
const { Command } = require('commander');
const fs = require('fs/promises');

const program = new Command();

const TODO_FILE = "todo.json";

const readFileContent = async (type, dataType = "All") => {
    // Read the file content using fs.readFile with a callback
    const content = await fs.readFile(TODO_FILE, 'utf-8');

    if (content) {
        // console.log("1");
        if (dataType === "All") {
            // console.log(dataType);
            if (type === "show") {
                // console.log(type);
                console.table(JSON.parse(content))
            } else {
                // console.log(type);
                return (content);
            }
        } else {
            // console.log(dataType);
            if (type === "show") {
                // console.log(type);
                console.log(content[0].length);
            } else {
                // console.log(type);
                return content[0].length;
            }
        }
    } else {
        console.log("err");
    }
};

const writeFileContent = async (task) => {
    let previousContent = await readFileContent("return");
    previousContent = JSON.parse(previousContent);
    let obJ = { "task": task };

    previousContent.push(obJ);
    previousContent = JSON.stringify(previousContent);

    await fs.writeFile(TODO_FILE, previousContent);
    console.log('Task Added in Todo List!..');
    return readFileContent("show");
}

const removeFileContent = async (task_index) => {
    task_index = parseInt(task_index)
    let previousContent = await readFileContent("return");
    previousContent = JSON.parse(previousContent);
    let newArr = previousContent.filter((_, index) => index !== task_index);
    // console.log(newArr)
    previousContent = JSON.stringify(newArr);
    await fs.writeFile(TODO_FILE, previousContent);
    console.log('Task Removed from Todo List!..');
    return readFileContent("show");
}



program
    .name('TODO CLI')
    .description('Todo Task Record CLI')
    .version('1.0.0')

program
    .option('-a, --add <task>', 'Add Task')
    .option('-r, --remove <task_no>', 'Remove Task (Enter index no to remove task)')
    .option('-l, --list', 'List Tasks');

program.parse(process.argv)
const options = program.opts();

// const printTable = (content) => {
//     content.map((index, data) => {
//         return `
//         <td>${data.id}</td>
//         <td>${data.task}</td>
//         `
//     })
// }

if (options.add) {
    console.log(`Adding task: ${options.add}`);
    writeFileContent(options.add);
} else if (options.remove) {
    console.log(`Removing task: ${options.remove}`);
    removeFileContent(options.remove)
} else if (options.list) {
    readFileContent("show");
} else {
    console.log('No valid options provided. Use --help for usage.');
}

