import dynamic from 'next/dynamic'

const Loaner = dynamic(() => import('../../components/card/Loaner'), { ssr: false })

export default function CardsLoaner() {
    return <Loaner />
}