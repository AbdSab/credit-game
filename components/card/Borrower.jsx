import { useEffect, useState } from "react";
import CardList from "./CardList";
import Modal from "./Modal";
import axios from 'axios';

export default function Borrower() {
  const [values, setValues] = useState(null);
  const [selected, setSelected] = useState(null);
  const [turned, setTurned] = useState(false);
  const [done, setDone] = useState(false);
  const [loan, setLoan] = useState(false);

  useEffect(() => {
      const fetchLoan = async () => {
        const {data} = await axios.get('https://card-api-game.herokuapp.com/card');
        if(data.length) {
            setLoan(data[0]);
            alert('Un collegue vous a transferer ' + data[0].loan)
            clearInterval(interval);
        }
      }
    const interval = setInterval(fetchLoan, 3000);
    fetchLoan();
  }, [])

  const sendResponse = async response => {
    await axios.post('https://card-api-game.herokuapp.com/borrower', {
        loan,
        gain: selected,
        accepted: response,
    });
    setDone(true);
  }

  useEffect(() => {
    setValues([500, 600, 400]);
  }, []);

  useEffect(() => {
      if(!selected) return;
      setTimeout(() => setTurned(true), 1000);
  }, [selected])

  if(!loan) return <div>Attente dun pret</div>

  return (
    <div className="App">
      {!done && values && <CardList values={values} selected={selected} setSelected={setSelected}/>}
      {!done && selected && turned && (
        <Modal isLoan={false} setResponse={sendResponse} selected={selected}/>
      )}
      {done && (
          <div>Merci</div>
      )}
    </div>
  );
}