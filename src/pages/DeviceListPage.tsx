import useSWR from "swr";
import { fetchDevices } from "../api";
import { type Device } from "../api";
import TopBar from "../components/TopBar";
import TitleBar from "../components/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/Button";
import PlusIcon from "../components/PlusIcon";
import DevicesList from "../components/DevicesList";
import Modal from "../components/Modal";
import { useState } from "react";

const DeviceListPage = () => {
  const { data, error, isLoading } = useSWR<Device[]>("/devices", fetchDevices);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.AppContainer}>
      <TopBar />

      <div className={styles.ContentArea}>
        <TitleBar title="Devices">
          <Button onClick={() => setShowModal(true)} icon={<PlusIcon />}>
            Add device
          </Button>
        </TitleBar>
        <DevicesList items={data} isLoading={isLoading} error={error} />
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div>Modal!</div>
      </Modal>
    </div>
  );
};

export default DeviceListPage;
