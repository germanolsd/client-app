import useSWR from "swr";
import { fetchDevices } from "../api";
import { type Device } from "../api";
import TopBar from "../components/TopBar";
import TitleBar from "../components/TitleBar";
import styles from "./DeviceListPage.module.css";
import Button from "../components/Button";
import PlusIcon from "../components/PlusIcon";

const DeviceListPage = () => {
  const { data, error, isLoading } = useSWR<Device[]>("/devices", fetchDevices);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading devices</div>;

  return (
    <div className={styles.AppContainer}>
      <TopBar />

      <div className={styles.ContentArea}>
        <TitleBar title="Device List">
          <Button onClick={() => console.log("add device")} icon={<PlusIcon />}>
            Add device
          </Button>
        </TitleBar>
        <ul>
          {data?.map((device) => (
            <li key={device.id}>{device.system_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeviceListPage;
