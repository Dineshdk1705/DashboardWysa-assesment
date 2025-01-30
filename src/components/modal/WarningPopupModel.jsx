/* eslint-disable react/prop-types */
const WarningPopupModal = ({ message, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-30 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
          <h2 className="text-lg font-semibold text-red-600">{message}</h2>
          <p className="text-gray-600 mt-2">{"This action can't be undone!"}</p>

          <div className="mt-4 flex justify-center gap-4">
            <button
              className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarningPopupModal;
