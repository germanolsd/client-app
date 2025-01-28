import useSWR from "swr";
import { fetchDevices, createDevice, updateDevice } from "../api";
import { type Device } from "../api";
import TopBar from "../components/topBar/TopBar";
import TitleBar from "../components/titleBar/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/button/Button";
import PlusIcon from "../components/common/PlusIcon";
import DevicesList from "../components/devicesList/DevicesList";
import AddDevicesModal from "../components/modal/AddDevicesModal";
import { useState } from "react";

const DeviceListPage = () => {
  const { data, error, isLoading, mutate } = useSWR<Device[]>(
    "/devices",
    fetchDevices
  );

  const [showAddModal, setShowAddModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);

  const handleAddDevice = async (formData: Omit<Device, "id">) => {
    try {
      const newDevice = await createDevice(formData);
      await mutate((devices = []) => [...devices, newDevice], {
        revalidate: false,
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to create device:", error);
    }
  };

  // const handleUpdateDevice = async (id: string, formData: Omit<Device, "id">) => {
  //   try {
  //     const updatedDevice = await updateDevice(id, formData);
  //     await mutate(
  //       (devices = []) => devices.map(device =>
  //         device.id === id ? updatedDevice : device
  //       ),
  //       { revalidate: false }
  //     );
  //   } catch (error) {
  //     console.error("Failed to update device:", error);
  //   }
  // };

  return (
    <div className={styles.AppContainer}>
      <TopBar />

      <div className={styles.ContentArea}>
        <TitleBar title="Devices">
          <Button onClick={() => setShowAddModal(true)} icon={<PlusIcon />}>
            Add device
          </Button>
        </TitleBar>
        <DevicesList items={data} isLoading={isLoading} error={error} />
      </div>
      <AddDevicesModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddDevice}
      />
    </div>
  );
};

export default DeviceListPage;
