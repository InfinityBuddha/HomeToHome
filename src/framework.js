export function importFromBelow() {
    const TEXT_ELEMENT = "TEXT ELEMENT";
    let rootInstance = null;

    function render(element, container) {
        const prevInstance = rootInstance;
        const nextInstance = reconcile(container, prevInstance, element);
        rootInstance = nextInstance;
    }

    function reconcile(parentDom, instance, element) {
        if (instance == null) {
            const newInstance = instantiate(element);
            parentDom.appendChild(newInstance.dom);
            return newInstance;
        } else {
            const newInstance = instantiate(element);
            parentDom.replaceChild(newInstance.dom, instance.dom);
            return newInstance;
        }
    }

    function instantiate(element) {
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

        // Instantiate and append children
        const childElements = props.children || [];
        const childInstances = childElements.map(instantiate); // children ends show must go on
        const childDoms = childInstances.map(childInstance => childInstance.dom);
        childDoms.forEach(childDom => dom.appendChild(childDom));

        const instance = { dom, element, childInstances };
        return instance;
    }

    function createElement(type, config, ...args) {
        const props = Object.assign({}, config);
        const hasChildren = args.length > 0;
        const rawChildren = hasChildren ? [].concat(...args) : [];        // create array with children
        props.children = rawChildren        // write chlidren in props
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
