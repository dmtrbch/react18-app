import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// eslint-disable-next-line no-unused-vars
const Modal = ({ children }) => {
  const elRef = useRef(null); // I have a div with a modal id and I want to have this same div back every time and not creating new

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current); // equal to componentWillUnmount for class components, cleanup
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
