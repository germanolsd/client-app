import Modal from "./Modal";
import Button, { ButtonType } from "../button/Button";
import type { Device } from "../../api";

type AddDevicesModalProps = {
  open: boolean;
  onClose: () => void;
  handleDeleteDevice: (id: string) => Promise<void>;
  selectedDevice: Device;
};

function AddDevicesModal({
  open,
  onClose,
  handleDeleteDevice,
  selectedDevice,
}: AddDevicesModalProps) {
  const deleteDevice = () => handleDeleteDevice(selectedDevice.id);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Deleve device?"
      actionButton={
        <Button type={ButtonType.Danger} onClick={deleteDevice}>
          Delete
        </Button>
      }
    >
      <p>
        You are about to delete the device <b>{selectedDevice.system_name}</b>.
        This action cannot be undone.
      </p>
    </Modal>
  );
}

export default AddDevicesModal;
