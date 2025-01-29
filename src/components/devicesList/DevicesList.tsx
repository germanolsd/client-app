import type { Device } from "../../api";
import styles from "./DevicesList.module.css";
import DeviceListItem from "./DeviceListItem";

type DevicesListProps = {
  items: Device[] | undefined;
  isLoading?: boolean;
  error?: boolean;
  invokeEditModal: (device: Device) => void;
  invokeDeleteModal: (device: Device) => void;
};

export default function DevicesList({
  items,
  isLoading,
  error,
  invokeEditModal,
  invokeDeleteModal,
}: DevicesListProps) {
  if (error) {
    return <p>Error loading devices</p>;
  }

  return (
    <div>
      <p>Device</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.list}>
          {items?.map((device) => (
            <DeviceListItem
              key={device.id}
              device={device}
              invokeEditModal={invokeEditModal}
              invokeDeleteModal={invokeDeleteModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
