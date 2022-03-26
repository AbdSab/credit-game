import { useState, useEffect, useRef } from 'react';
import CardList from './CardList';
import { getImages } from './images';

export default function Loaner() {
    const [cards, setCards] = useState(getImages());
    const selected = useRef([]);
    const [done, setDone] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => setTimer(timer => timer-1), 1000);
        return () => clearInterval(interval);
    }, []);

    const onClick = _id => {
        const _cards = [...cards];
        const found = cards.findIndex(({id}) => id === _id);
        if(selected.current.length && selected.current.find(e => e.id === _id))return;
        _cards[found].hidden = false;
        setCards([..._cards]);
        selected.current.push(_cards[found]);
        if(selected.current.length === 2) {
            if(selected.current[0].img === selected.current[1].img) {
                _cards.find(e => e.id === selected.current[0].id).done = true;
                _cards.find(e => e.id === selected.current[1].id).done = true;
                selected.current = [];
                setCards(_cards.map(e => ({...e, hidden: true})));
                return;
            }
        }
        if(selected.current.length > 2) {
            setCards(_cards.map(e => ({...e, hidden: true})));
            selected.current = [];
        }
    };

    useEffect(() => {
        const done = cards.filter(e => e.done).length;
        if(done >= 24 || timer < 0) setDone(true);
    }, [cards, timer]);

    return (
        <div>
            {!done && (
                <>
                    <div>Temp: {timer}s</div>
                    <CardList cards={cards} onClick={onClick} />
                </>
            )}
        </div>
    )
}