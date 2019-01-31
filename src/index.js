import { importFromBelow } from "./framework";

/** @jsx Didact.createElement */
const Didact = importFromBelow();
const stories = [
    { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" }
];

//
// function tick() {
//     const time = new Date().toLocaleTimeString();
//     const clockElement = <h1>{time}</h1>;
//     Didact.render(clockElement, document.getElementById("root"));
// }
//
// setInterval(tick, 1000);

const appElement = <div><ul>{stories.map(storyElement)}</ul></div>;

function storyElement({ name, url }) {
    const likes = Math.ceil(Math.random() * 100);
    debugger;
    return (
        <li>
            <div>{name}</div>
        </li>
    );
}

Didact.render(appElement, document.getElementById("root"));
