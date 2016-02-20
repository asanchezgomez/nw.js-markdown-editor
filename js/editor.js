//In this file, we add the function reload() to the exports variable. This variable will be returned when the function require() is called. 
//The require() function is called when you want to load a .js file or a Node.js module. The function requires the module “marked” and sets 
//its options. One of the most important options is sanitize. If this is set to true, HTML attributes which you use between your Markdown 
//will be encoded. This is not what you want, because Markdown can (and should, if necessary) be mixed with HTML. resultDiv is the div 
//which should contain the rendered Markdown and textEditor is our textarea. text is the text from the textarea. The last line puts the 
//rendered Markdown in the resultDiv.
exports.reload = function(){
    var marked = require("marked");
    marked.setOptions({
    renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    var resultDiv = global.$('.md_result');
    var textEditor = global.$('#editor');
    var text = textEditor.val();
    resultDiv.html(marked(text));
};

//The function loadText() replaces the current text in the textarea with a new one. When the text is replaced, reload() is called so the 
//Markdown will be parsed and directly shown in the div on the right. 
exports.loadText = function(text){
    var textEditor = global.$('#editor');
    textEditor.val(text);
    exports.reload();
};

//The function loadFile() takes a path to a specific file as parameter and loads the contents of that file in the textarea.
exports.loadFile = function(file){
    var fs = require('fs');
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        exports.loadText(data);
    });
};

//This function takes the name of the file dialog element (this will be “#openFileDialog” in our case) and the second parameter is the 
//function which will be executed when the file has been selected. You have to “require” editor.js in the initMenu() function in menu.js
exports.chooseFile = function(name, callback) {
    var chooser = global.$(name);
    chooser.change(function(evt) {
        callback(global.$(this).val());
    });

    chooser.trigger('click');
};
