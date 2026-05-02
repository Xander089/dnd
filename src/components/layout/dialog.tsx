import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";

export default function Dialog(props: any) {
  const width = props?.customModal ?? "30%";
  return createPortal(
    <div className={styles.modal}>
      <div style={{ width: width }} className={styles.modalContent}>
        {props.children}
      </div>
    </div>,
    document.body
  );
}
