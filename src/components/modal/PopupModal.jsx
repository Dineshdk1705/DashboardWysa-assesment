/* eslint-disable react/prop-types */
const PopupModal = ({ children, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="rounded-lg p-4 shadow-lg">{children}</div>
      </div>
    </>
  );
};

export default PopupModal;
