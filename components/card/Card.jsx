import cx from 'classnames';
import Image from 'next/image';

export default function Card({ value, selected, setSelected }) {
    const isSelected = selected === value;

    return (
        <div className={cx("Card", {Card__Turn: isSelected})} onClick={_ => !selected && setSelected(value)}>
            <Image src="/card.png" width={200} height={300} alt="card"/>
            <div>{value}</div>
        </div>
    )
}