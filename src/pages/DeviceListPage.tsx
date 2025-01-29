import useSWR from "swr";
import { fetchDevices, createDevice, updateDevice, deleteDevice } from "../api";
import { type Device } from "../api";
import TopBar from "../components/topBar/TopBar";
import TitleBar from "../components/titleBar/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/button/Button";
import PlusIcon from "../components/common/PlusIcon";
import DevicesList from "../components/devicesList/DevicesList";
import EditDevicesModal from "../components/modal/EditDevicesModal";
import DeleteDeviceModal from "../components/modal/DeleteDeviceModal";
import { useState } from "react";

const DeviceListPage = () => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateDevicesCache,
  } = useSWR<Device[]>("/devices", fetchDevices);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(
    undefined
  );

  const handleEditSubmit = async (formData: Omit<Device, "id">) => {
    if (selectedDevice) {
      await handleUpdateDevice(selectedDevice.id, formData);
    } else {
      await handleAddDevice(formData);
    }
  };

  const handleAddDevice = async (formData: Omit<Device, "id">) => {
    try {
      const newDevice = await createDevice(formData);
      await mutateDevicesCache((devices = []) => [...devices, newDevice], {
        revalidate: false,
      });
      closeEditModal();
    } catch (error) {
      console.error("Failed to create device:", error);
    }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!selectedDevice) return;
    try {
      const success = await deleteDevice(id);
      if (success) {
        await mutateDevicesCache(
          (devices = []) => devices.filter((device) => device.id !== id),
          { revalidate: false }
        );
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Failed to delete device:", error);
    }
  };

  const handleUpdateDevice = async (
    id: string,
    formData: Omit<Device, "id">
  ) => {
    try {
      const updatedDevice = await updateDevice(id, formData);
      if (!updatedDevice) return;
      await mutateDevicesCache(
        (devices = []) =>
          devices.map((device) =>
            device.id === id ? { id, ...formData } : device
          ),
        { revalidate: false }
      );
      closeEditModal();
    } catch (error) {
      console.error("Failed to update device:", error);
    }
  };

  const showAddModal = () => {
    setSelectedDevice(undefined);
    setShowEditModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedDevice(undefined);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedDevice(undefined);
  };
  const invokeDeleteModal = (device: Device) => {
    setSelectedDevice(device);
    setShowDeleteModal(true);
  };
  const invokeEditModal = (device: Device) => {
    setSelectedDevice(device);
    setShowEditModal(true);
  };

  return (
    <div className={styles.AppContainer}>
      <TopBar />

      <div className={styles.ContentArea}>
        <TitleBar title="Devices">
          <Button onClick={showAddModal} icon={<PlusIcon />}>
            Add device
          </Button>
        </TitleBar>
        <DevicesList
          items={data}
          isLoading={isLoading}
          error={error}
          invokeDeleteModal={invokeDeleteModal}
          invokeEditModal={invokeEditModal}
        />
      </div>
      <EditDevicesModal
        open={showEditModal}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        selectedDevice={selectedDevice}
      />
      {selectedDevice && (
        <DeleteDeviceModal
          open={selectedDevice && showDeleteModal}
          onClose={closeDeleteModal}
          handleDeleteDevice={handleDeleteDevice}
          selectedDevice={selectedDevice}
        />
      )}
    </div>
  );
};

export default DeviceListPage;
