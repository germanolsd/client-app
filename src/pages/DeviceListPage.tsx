import useSWR from "swr";
import { fetchDevices } from "../api";
import { type Device } from "../api";
import TopBar from "../components/TopBar";
import TitleBar from "../components/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/Button";
import PlusIcon from "../components/PlusIcon";
import DevicesList from "../components/DevicesList";

const DeviceListPage = () => {
  const { data, error, isLoading } = useSWR<Device[]>("/devices", fetchDevices);

  return (
    <div className={styles.AppContainer}>
      <TopBar />

      <div className={styles.ContentArea}>
        <TitleBar title="Device List">
          <Button onClick={() => console.log("add device")} icon={<PlusIcon />}>
            Add device
          </Button>
        </TitleBar>
        <DevicesList items={data} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default DeviceListPage;
