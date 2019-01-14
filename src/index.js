import { createElement, render } from './framework'


const element = {
    type: "div",
    props: {
        id: "container",
        children: [
            { type: "input", props: { value: "foo", type: "text" } },
            { type: "a", props: { href: "/bar", value: '34343434' } },
            { type: "span", props: {value: '343434'} }
        ]
    }
};
render(element, document.getElementById('root'));
