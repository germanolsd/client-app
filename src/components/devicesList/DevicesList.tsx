import type { Device } from "../../api";
import styles from "./DevicesList.module.css";
import DeviceListItem from "./DeviceListItem";

type DevicesListProps = {
  items: Device[] | undefined;
  isLoading?: boolean;
  error?: boolean;
  openEditModal: (device: Device) => void;
  openDeleteModal: (device: Device) => void;
};

export default function DevicesList({
  items,
  isLoading,
  error,
  openEditModal,
  openDeleteModal,
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
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
