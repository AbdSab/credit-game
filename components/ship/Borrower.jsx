import { useEffect, useRef } from "react/cjs/react.production.min";

export default function ShipBorrower() {
    const canvas = useRef(null);

    useEffect(() => {
        if(!canvas.current) return;
        new Game({canvas: canvas.current});
    }, []);

    return (<canvas ref={canvas} />)
}