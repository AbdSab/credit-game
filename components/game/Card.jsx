import Image from "next/image";

export default function Card({ card, onClick }) {
    const url = (!card.hidden || card.done) ? `/assets/tiles/${card.img}` : '/card.png';
    return (
        <div className="Game__Card" onClick={() => onClick(card.id)}>
            <Image src={url} width={140} height={140} alt={card.id}/>
        </div>
    )
}