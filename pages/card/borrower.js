import dynamic from 'next/dynamic'

const Borrower = dynamic(() => import('../../components/card/Borrower'), { ssr: false })

export default function CardsBorrower() {
    return <Borrower />
}