import useSWR from "swr";
import { fetchDevices } from "../api";
import { type Device } from "../api";
import TopBar from "../components/topBar/TopBar";
import TitleBar from "../components/titleBar/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/button/Button";
import PlusIcon from "../components/common/PlusIcon";
import DevicesList from "../components/devicesList/DevicesList";
import EditDevicesModal from "../components/modal/EditDevicesModal";
import DeleteDeviceModal from "../components/modal/DeleteDeviceModal";
import Filter from "../components/filter/filter";
import { useState } from "react";
import {
  handleAddDevice,
  handleUpdateDevice,
  handleDeleteDevice,
} from "./hooks";

const DeviceListPage = () => {
  const {
    data: devicesList,
    error,
    isLoading,
    mutate: mutateDevicesCache,
  } = useSWR<Device[]>("/devices", fetchDevices);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>(
    undefined
  );
  const [filteredDevicesList, setFilteredDecicesList] = useState<Device[]>(
    devicesList || []
  );

  const handleEditSubmit = async (formData: Omit<Device, "id">) => {
    if (selectedDevice) {
      await handleUpdateDevice({
        formData,
        id: selectedDevice.id,
        onSuccess: () => {
          mutateDevicesCache(
            (devices = []) =>
              devices.map((device) =>
                device.id === selectedDevice.id ? (formData as Device) : device
              ),
            { revalidate: false }
          );
          closeEditModal();
        },
        onError: (error: unknown) =>
          console.error("Failed to update device:", error),
      });
    } else {
      await handleAddDevice({
        formData,
        onSuccess: (newDevice?: Device) => {
          if (!newDevice) return;
          mutateDevicesCache((devices = []) => [...devices, newDevice], {
            revalidate: false,
          });
          closeEditModal();
        },
        onError: (error: unknown) =>
          console.error("Failed to create device:", error),
      });
    }
  };

  const openAddDevicesModal = () => {
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

  return (
    <div className={styles.AppContainer}>
      <TopBar />

      <Filter
        data={devicesList || []}
        onFilter={(filteredDevices: Device[]) => {
          setFilteredDecicesList(filteredDevices);
        }}
      />

      <div className={styles.ContentArea}>
        <TitleBar title="Devices">
          <Button onClick={openAddDevicesModal} icon={<PlusIcon />}>
            Add device
          </Button>
        </TitleBar>

        <DevicesList
          items={filteredDevicesList}
          isLoading={isLoading}
          error={error}
          openDeleteModal={(device) => {
            setSelectedDevice(device);
            setShowDeleteModal(true);
          }}
          openEditModal={(device) => {
            setSelectedDevice(device);
            setShowEditModal(true);
          }}
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
          handleDeleteDevice={async (id) => {
            handleDeleteDevice({
              id,
              onSuccess: async () => {
                await mutateDevicesCache(
                  (devices = []) =>
                    devices.filter((device) => device.id !== id),
                  { revalidate: false }
                );
                closeDeleteModal();
              },
              onError: (error: unknown) =>
                console.error("Failed to delete device:", error),
            });
          }}
          selectedDevice={selectedDevice}
        />
      )}
    </div>
  );
};

export default DeviceListPage;
