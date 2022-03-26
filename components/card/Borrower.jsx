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
        const {data} = await axios.get('http://localhost:4000/card');
        if(data.length) {
            setLoan(data[0]);
            clearInterval(interval);
        }
      }
    const interval = setInterval(fetchLoan, 3000);
    fetchLoan();
  }, [])

  const sendResponse = async response => {
    await axios.post('http://localhost:4000/card/borrower', {
        loan,
        gain: selected,
        accepted: response,
    });
    setDone(true);
  }

  useEffect(() => {
    setValues([100, 200, 300]);
  }, []);

  useEffect(() => {
      if(!selected) return;
      setTimeout(() => setTurned(true), 2000);
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