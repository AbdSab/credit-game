import Card from "./Card";

export default function CardList({ cards, onClick }) {
    return (
        <div className="GameContainer">
            {cards.map(card => <Card key={card.id} card={card} onClick={onClick} />)}
        </div>
    )
}