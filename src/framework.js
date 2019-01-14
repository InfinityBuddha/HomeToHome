function element(element, children) {
    if (typeof element === 'function' && isClass(element)) {
        const component = new element()
        return component.render()
    }

    if (typeof element === 'function') {
        return element()
    } else {
        const el = document.createElement(element);
        children.forEach(child => {
            if (typeof child === 'object') {
                el.appendChild(child)
            } else {
                el.innerHTML += child
            }
        })
        return el;
    }
}

const TEXT_ELEMENT = "TEXT ELEMENT";

export function createElement(type, config, ...args) {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const rawChildren = hasChildren ? [].concat(...args) : [];
    props.children = rawChildren
        .filter(c => c != null && c !== false)
        .map(c => c instanceof Object ? c : createTextElement(c));
    return { type, props };
}

function createTextElement(value) {
    return createElement(TEXT_ELEMENT, { nodeValue: value });
}
/*
// return created element
export function createElement(el, props, ...children) {
    return element(el, children);
}*/

function isClass(func) {
    return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
}
export function render(element, parentDom) {
    const { type, props } = element;

    // Create DOM element
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
        ? document.createTextNode("")
        : createElement(type);

    // Add event listeners
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
    });

    // Set properties
    const isAttribute = name => !isListener(name) && name != "children";
    Object.keys(props).filter(isAttribute).forEach(name => {
        dom[name] = props[name];
    });

    // Render children
    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));

    // Append to parent
    parentDom.appendChild(dom);
}
