import { useState } from "react"

export default function Modal({ selected, setResponse, isLoan, handleSetLoan, loan }) {
    const [step, setStep] = useState(0);

    const onclick = () => {
        setResponse(true);
    }

    return (
        <div className="Modal">
            <div className="Modal__Content">
                {{
                    0: (
                        <>Felicitation, vous avez gagne <strong style={{margin:4}}>{selected} DH</strong></>
                    ),
                    1: (
                        <>
                            {isLoan ? (
                                <span>Vous voulez empreinter a votre collegue ?</span>
                                ) : (
                                <span>Voulez vous rendre l'argent empreite par votre college?</span>
                            )}
                        </>
                    ),
                    2: (
                        <>
                            Entrez la somme
                        </>
                    )
                }[step]}
            </div>
            <div className="Modal__Menu">
                    {{
                        0: <button onClick={_ => setStep(1)}>Suivant</button>,
                        1: (
                            <>
                                <button onClick={_ => isLoan ? setStep(2) : setResponse(true)}>Oui</button>
                                <button onClick={_ => {setResponse(false)}}>Non</button>
                            </>
                        ),
                        2: (
                            <>
                                <input type="number" min={1} max={loan} value={loan} onChange={handleSetLoan}/>
                                <button onClick={onclick}>Empreinter</button>
                            </>
                        )
                    }[step]}
                </div>
        </div>
    )
}