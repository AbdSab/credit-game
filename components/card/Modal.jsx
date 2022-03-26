import { useState } from "react"

export default function Modal({ selected, setResponse, isLoan }) {
    const [step, setStep] = useState(0);

    return (
        <div className="Modal">
            <div className="Modal__Content">
                {{
                    0: (
                        <>Felicitation, vous avez gagne <strong style={{margin:4}}>{selected} DH</strong></>
                    ),
                    1: (
                        <>{isLoan ? (<span>Vous voulez empreinter {selected / 2} a votre collegue ?</span>) : (<span>Voulez vous rendre l'argent empreite par votre college?</span>)}</>
                    )
                }[step]}
            </div>
            <div className="Modal__Menu">
                    {{
                        0: <button onClick={_ => setStep(1)}>Suivant</button>,
                        1: (
                            <>
                                <button onClick={_ => setResponse(true)}>Oui</button>
                                <button onClick={_ => setResponse(false)}>Non</button>
                            </>
                        ),
                    }[step]}
                </div>
        </div>
    )
}