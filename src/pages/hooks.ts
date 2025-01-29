import type { Device } from "../api";
import { createDevice, updateDevice, deleteDevice } from "../api";

/**
 * Handles the addition of a new device.
 *
 * @param {Object} params - The parameters for adding the device.
 * @param {Omit<Device, "id">} params.formData - The form data for the new device, excluding the ID.
 * @param {(device?: Device) => void} params.onSuccess - The callback function to execute on successful addition.
 * @param {(error: unknown) => void} params.onError - The callback function to execute on error.
 * @returns {Promise<void>} A promise that resolves when the add operation is complete.
 */
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

/**
 * Handles the update of a device.
 *
 * @param {Object} params - The parameters for updating the device.
 * @param {string} params.id - The ID of the device to update.
 * @param {Omit<Device, "id">} params.formData - The form data for the device, excluding the ID.
 * @param {() => void} params.onSuccess - The callback function to execute on successful update.
 * @param {(error: unknown) => void} params.onError - The callback function to execute on error.
 * @returns {Promise<void>} A promise that resolves when the update operation is complete.
 */
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

/**
 * Handles the deletion of a device.
 *
 * @param {Object} params - The parameters for deleting the device.
 * @param {string} params.id - The ID of the device to delete.
 * @param {() => void} params.onSuccess - The callback function to execute on successful deletion.
 * @param {(error: unknown) => void} params.onError - The callback function to execute on error.
 * @returns {Promise<void>} A promise that resolves when the delete operation is complete.
 */
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
