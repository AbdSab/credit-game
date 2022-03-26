import { useEffect, useRef } from "react";
import Game from "./game/Game";

export default function ShipBorrower() {
    const canvas = useRef();

    useEffect(() => {
        if(!canvas.current) return;
        new Game({canvas: canvas.current});
    }, []);

    return (<div className="ShipContainer" ref={canvas} />)
}