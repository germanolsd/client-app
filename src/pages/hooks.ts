import type { Device } from "../api";
import { createDevice, updateDevice, deleteDevice } from "../api";

export const handleAddDevice = async ({
  formData,
  onSuccess,
  onError,
}: {
  formData: Omit<Device, "id">;
  onSuccess: (device?: Device) => void;
  onError: (error: unknown) => void;
}) => {
  try {
    const newDevice = await createDevice(formData);
    onSuccess(newDevice);
  } catch (error) {
    onError(error);
  }
};

export const handleUpdateDevice = async ({
  id,
  formData,
  onSuccess,
  onError,
}: {
  id: string;
  formData: Omit<Device, "id">;
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  try {
    const success = await updateDevice(id, formData);
    if (!success) return;
    onSuccess();
  } catch (error) {
    onError(error);
  }
};
export const handleDeleteDevice = async ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  try {
    if (await deleteDevice(id)) {
      onSuccess();
    }
  } catch (error) {
    onError(error);
  }
};
