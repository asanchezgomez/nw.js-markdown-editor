//As you can see here, the “win” object is being requested. This object is needed if you want to change certain things on the Webkit window 
//(in this case add a menu bar). A menu bar is created and a submenu with different options is added to this bar.
//You have to add this piece of code to the init() method in main.js
exports.initMenu = function(){
    var win = global.gui.Window.get();
    var menubar = new global.gui.Menu({ type: 'menubar' });
    var fileMenu = new global.gui.Menu();
		var editor = require("./../js/editor.js");

		//New
		//An empty string is loaded within the editor and the Markdown result will be reloaded.
    fileMenu.append(new global.gui.MenuItem({
				label: 'New',
				click: function() {
				    editor.loadText("");
				}
		}));

		//Open
    fileMenu.append(new global.gui.MenuItem({
				label: 'Open',
				click: function() {
				    editor.chooseFile("#openFileDialog", function(filename){
				        editor.loadFile(filename);
				    });
				}
		}));

		//Save
		//In the “Save” button click, we can use the chooseFile() method. When the right file location and name have been filled in, the fs 
		//module will be loaded. The contents of the textarea will be retrieved and passed to the writeFile() method of fs.
    fileMenu.append(new global.gui.MenuItem({
				label: 'Save',
				click: function() {
				    editor.chooseFile("#saveFileDialog", function(filename){
				        var fs = require('fs');
				        var textEditor = global.$('#editor');
				        fs.writeFile(filename, textEditor.val(), function(err) {
				            if(err) {
				                console.log(err);
				            } else {
				                console.log("The file was saved!");
				            }
				        }); 
				    });
				}
		}));

		//Exit
    fileMenu.append(new global.gui.MenuItem({
        label: 'Exit',
        click: function() {
            global.gui.App.quit();
        }
    }));

    menubar.append(new global.gui.MenuItem({ label: 'File', submenu: fileMenu}));
    win.menu = menubar;
};
