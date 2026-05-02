import { useState, useEffect } from "react";
import "./ModalDamageCure.css";
import Dialog from "../layout/dialog";

function DamageCure(props: any) {
  const [amount, setAmount] = useState<number | "">("");
  const visible: boolean = props?.visible ?? false;
  const setVisible: (visible: boolean) => void = props?.setVisible;

  useEffect(() => {
    if (visible) setAmount("");
  }, [visible]);

  function handleOk() {
    setVisible(!visible);
    props?.action(amount === "" ? 0 : amount);
  }
  function handleCancel() {
    setVisible(!visible);
  }

  function handleAmountChange(event: any) {
    const value = event.target.value;
    if (value === "") {
      setAmount("");
      return;
    }
    const parsed = parseInt(value, 10);
    setAmount(isNaN(parsed) || parsed < 0 ? 0 : parsed);
  }

  return visible ? (
    <Dialog customModal="25%" onClose={handleCancel}>
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
