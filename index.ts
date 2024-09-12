import inquirer from "inquirer";
let todo: string[] = [];
let condition = true;

while (condition) {
    let ans = await inquirer.prompt([
        {
            name: 'select',
            type: 'list',
            message: ("Select The Options"),
            choices: ["Add", "Update", "View", "Delete", "Exit"]
        },
    ]);

    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Add items in the list",
            validate: function (input) {
                if (input.trim() == "") {
                    return "Please enter a non-empty item";
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "") {
            todo.push(addTodo.todo);
            console.log("Updated To-Do List:");
            todo.forEach((item, index) => console.log(`${index + 1}. ${item}`));
        }
    }

    if (ans.select === "Update") {
        if (todo.length === 0) {
            console.log("No items to update.");
            continue;
        }
        let updateTodo = await inquirer.prompt({
            name: 'todo',
            type: 'list',
            message: 'Update items in the list',
            choices: todo.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "Update the selected item",
        });
        todo = todo.map(item => item === updateTodo.todo ? addTodo.todo : item);
        console.log("Updated To-Do List:");
        todo.forEach((item, index) => console.log(`${index + 1}. ${item}`));
    }

    if (ans.select === "View") {
        console.log("***** TO-DO LIST *****");
        if (todo.length === 0) {
            console.log("No items in the list.");
        } else {
            todo.forEach((item, index) => console.log(`${index + 1}. ${item}`));
        }
    }

    if (ans.select === "Delete") {
        if (todo.length === 0) {
            console.log("No items to delete.");
            continue;
        }
        let deleteTodo = await inquirer.prompt({
            name: 'todo',
            type: 'list',
            message: 'Select item to delete',
            choices: todo.map(item => item)
        });
        todo = todo.filter(val => val !== deleteTodo.todo);
        console.log("Updated To-Do List:");
        todo.forEach((item, index) => console.log(`${index + 1}. ${item}`));
    }

    if (ans.select === "Exit") {
        console.log("Exiting Program!");
        condition = false;
    }
}




