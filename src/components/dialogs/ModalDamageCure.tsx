import { useState, useEffect } from "react";
import "./ModalDamageCure.css";
import Dialog from "../layout/dialog";

function DamageCure(props: any) {
  const [amount, setAmount] = useState(0);
  const visible: boolean = props?.visible ?? false;
  const setVisible: (visible: boolean) => void = props?.setVisible;

  function handleOk() {
    setVisible(!visible);
    props?.action(amount);
  }
  function handleCancel() {
    setVisible(!visible);
  }

  function handleAmountChange(event: any) {
    const amount: number = event.target.value ?? 0;
    const result = amount < 0 ? 0 : amount;
    setAmount(result);
  }

  return visible ? (
    <Dialog customModal="25%">
      <div className="modal-content">
        <div className="modal-title">
          <h3>{props?.Label ?? ""}</h3>
        </div>
        <input
          placeholder="amount"
          type={"number"}
          value={amount}
          onChange={(event: any) => handleAmountChange(event)}
        ></input>
        <div className="modal-buttons">
          <button style={{ width: "5rem" }} onClick={handleCancel}>
            Cancel
          </button>
          <button
            style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
            onClick={handleOk}
          >
            Ok
          </button>
        </div>
      </div>
    </Dialog>
  ) : (
    <></>
  );
}

export default DamageCure;
