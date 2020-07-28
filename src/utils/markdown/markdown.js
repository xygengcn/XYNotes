import marked from './marked';
import './markdown.scss';
import './emoji.css';
import './highlight/styles/monokai-sublime.css'

const emojis = require('./emojis.json');
import hljs from './highlight/highlight.pack';

//emoji表情来处
//https://www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/bowtie.png

var renderer = new marked.Renderer();
renderer.listitem = function(e) {
    var reg = /<input.*disabled="" type="checkbox"/;
    if (reg.test(e)) {
        return "<li class='li-checkbox'>" + e + "</li>\n";
    }
    return "<li>" + e + "</li>\n"
}
renderer.emoji = function(e) {
    if (emojis[e]) {
        return `<em id="${emojis[e].id}" class="md-emoji" data-src="${emojis[e].src}"></em>`;
    }
    return `<emoji>[${e}]</emoji>`;
}
marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
})
var markdown = function(html, type = "marked") {
    if (type == "marked") {
        return marked(html)
    } else {
        return html;
    }
};
export default markdown;