import { useState, useEffect, useRef } from 'react';
import CardList from './CardList';
import { getImages } from './images';

export default function Loaner() {
    const [cards, setCards] = useState(getImages());
    const selected = useRef([]);
    const [done, setDone] = useState(false);
    const [timer, setTimer] = useState(5);
    const [score, setScore] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            if(done) {
                clearInterval(interval);
                setTimer(0);
                return;
            };
            setTimer(timer => timer-1)
        }, 1000);
        return () => clearInterval(interval);
    }, [done]);

    useEffect(() => {
        if(!done) return;
        window.alert(`Vous avez termine le jeu`);
        window.alert(`Vous avez gange ${score}`);
        let loan = 0;
        if(window.confirm(`Voulez vous empreinter une somme a votre collegue ?`)) {
            do{
                loan = Number(window.prompt('Entrer la somme a empreinter', '0'));
            }while(isNaN(loan) || loan < 0 || loan > score);
        } 
        window.alert(`Merci, votre gain total est ${score - loan}`)
        setScore(score - loan)
    }, [done, score])

    const onClick = _id => {
        if(done) return;
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
                setScore(score => score + 10);
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
            {(
                <div className='Game'>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div>Temp: {timer}s</div>
                        <div>Score: {score}</div>
                    </div>
                    <CardList cards={cards} onClick={onClick} />
                </div>
            )}
        </div>
    )
}