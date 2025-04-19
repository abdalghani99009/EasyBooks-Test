import { Popup } from "devextreme-react/popup";
import { Dispatch, SetStateAction } from "react";

export default function DeleteModal({
  isVisible,
  setIsVisible,
  title,
  onConfirm,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  onConfirm: () => void;
}) {
  return (
    <Popup
      visible={isVisible}
      onHiding={() => setIsVisible(false)}
      title={title}
      showCloseButton
      dragEnabled
      width={400}
    >
      <div className="p-4 flex flex-col gap-4">
        <p>Are you sure you want to delete this item?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setIsVisible(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              setIsVisible(false);
              onConfirm();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Popup>
  );
}
