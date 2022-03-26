import dynamic from 'next/dynamic'

const Loaner = dynamic(() => import('../../components/game/Loaner'), { ssr: false })

export default function ShipLoaner() {
    return <Loaner />
}