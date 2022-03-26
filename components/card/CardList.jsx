import Card from "./Card";

export default function CardList({ values, selected, setSelected }) {
    return (
        <div className="CardList">
            {values.map(value => <Card key={value} value={value} selected={selected} setSelected={setSelected}/>)}
        </div>
    )
}