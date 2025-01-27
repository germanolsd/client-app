import useSWR from "swr";
import { fetchDevices } from "../api";
import { type Device } from "../api";
import TopBar from "../components/topBar/TopBar";
import TitleBar from "../components/titleBar/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/button/Button";
import PlusIcon from "../components/common/PlusIcon";
import DevicesList from "../components/devicesList/DevicesList";
import Modal from "../components/modal/Modal";
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
