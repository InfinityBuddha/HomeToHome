export function importFromBelow() {
    const TEXT_ELEMENT = "TEXT ELEMENT";
    function render(element, parentDom) {
        const { type, props } = element;
        // Create DOM element
        const isTextElement = type === TEXT_ELEMENT;
        const dom = isTextElement
            ? document.createTextNode("")
            : document.createElement(type);

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
        console.log({parentDom}, {lastChild: parentDom.lastChild});
        // Append to parent
        if (parentDom.lastChild) {
            parentDom.replaceChild(dom, parentDom.lastChild)
        } else {
            parentDom.appendChild(dom);
        }
    }

    function createElement(type, config, ...args) {
        const props = Object.assign({}, config);
        const hasChildren = args.length > 0;
        // create array with children
        const rawChildren = hasChildren ? [].concat(...args) : [];
        // write chlidren in props
        props.children = rawChildren
            .filter(c => c !== null && c !== false)
            .map(c => c instanceof Object ? c : createTextElement(c));
        return { type, props };
    }

    function createTextElement(value) {
        return createElement(TEXT_ELEMENT, { nodeValue: value });
    }

    return {
        render,
        createElement
    };
}
