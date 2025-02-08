/*
Generic functions to handle HTML manipulation
This class is designed to be generic and reusable in multiple projects, to handle tedious busiwork that's a pain to do with vanilla js
*/

export const DOM_Helper = (function () {
    
    function AppendDivWithClasses(parentNode, classes) {
        const div = document.createElement('div');
        for (let i = 0; i < classes.length; i++) {
            div.classList.add(classes[i]);
        }
        parentNode.appendChild(div);

        return div;
    }

    function AppendTag(parentNode, tag, contents, classList = []) {
        const tagHTML = document.createElement(tag);
        tagHTML.textContent = contents;
        for (let i = 0; i < classList.length; i++) {
            tagHTML.classList.add(classList[i]);
        }
        parentNode.appendChild(tagHTML);

        return tagHTML;
    }

    function AppendSpan(parentNode, contents, classList = []) {
        return AppendTag(parentNode, "span", contents, classList);
    }


    return {
        AppendDivWithClasses,
        AppendTag,
        AppendSpan,
    };

})();

