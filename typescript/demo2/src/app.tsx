/*
import * as React from "react";
import * as ReactDOM from "react-dom";


const Hello = (props: { compiler: string, framework: string }) => {
    return (
        <div>
            <div>{props.compiler}</div>
            <div>{props.framework}</div>
        </div>
    );
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);
*/
import * as root from "ts-npm-module";

var foo = root.foo;
var Bar = root.Bar;
var bas = root.bas;

console.log(bas);
var para = document.createElement("p");
var node = document.createTextNode(bas);
document.getElementById("root").appendChild(node);
