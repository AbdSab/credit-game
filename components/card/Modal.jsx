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
                        <>{`Congratulations, you won`} <strong style={{margin:4}}>{selected} DH</strong></>
                    ),
                    1: (
                        <>
                            {isLoan ? (
                                <span>{`Do you want to loan player 2 ?`}</span>
                                ) : (
                                <span>{`Do you want to refund player 1 the amount ${loan.loan + loan.loan/2}?`}</span>
                            )}
                        </>
                    ),
                    2: (
                        <>
                            {`Enter the amount to lend`}
                        </>
                    )
                }[step]}
            </div>
            <div className="Modal__Menu">
                    {{
                        0: <button onClick={_ => setStep(1)}>Next</button>,
                        1: (
                            <>
                                <button onClick={_ => isLoan ? setStep(2) : setResponse(true)}>Yes</button>
                                <button onClick={_ => {setResponse(false)}}>No</button>
                            </>
                        ),
                        2: (
                            <div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <input type="number" min={1} max={loan} value={loan} onChange={handleSetLoan}/>
                                    <span style={{marginLeft: '20px'}}>DH</span>
                                </div>
                                <br />
                                <button onClick={onclick} style={{width: '100%'}}>Ok</button>
                            </div>
                        )
                    }[step]}
                </div>
        </div>
    )
}