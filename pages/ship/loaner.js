import dynamic from 'next/dynamic'

const Borrower = dynamic(() => import('../../components/ship/Borrower'), { ssr: false })

export default function ShipLoaner() {
    return <Borrower />
}