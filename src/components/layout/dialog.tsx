import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import styles from "./Dialog.module.css";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function Dialog(props: any) {
  const width = props?.customModal ?? "30%";
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        props.onClose?.();
        return;
      }
      if (e.key === "Enter") {
        const target = document.activeElement as HTMLInputElement;
        const tag = target?.tagName;
        const type = target?.type;
        if (tag !== "BUTTON" && tag !== "TEXTAREA" && type !== "checkbox" && type !== "radio") {
          e.preventDefault();
          props.onConfirm?.();
        }
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(el!.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return createPortal(
    <div className={styles.modal}>
      <div ref={contentRef} style={{ width: width }} className={styles.modalContent}>
        {props.children}
      </div>
    </div>,
    document.body
  );
}
