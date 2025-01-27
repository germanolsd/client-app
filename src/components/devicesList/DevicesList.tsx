import { useEffect } from "react";
import type { Device } from "../../api";
import styles from "./DevicesList.module.css";

type DevicesListProps = {
  items: Device[] | undefined;
  isLoading?: boolean;
  error?: boolean;
};

type DeviceType = Device["type"];

const iconMap: Record<DeviceType, string> = {
  WINDOWS: "./windows.svg",
  MAC: "./macos.svg",
  LINUX: "./linux.svg",
};

export default function DevicesList({
  items,
  isLoading,
  error,
}: DevicesListProps) {
  useEffect(() => {
    console.log(items);
  }, [items]);

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
            <li key={device.id}>
              <div className={styles.device}>
                <img src={iconMap[device.type]} alt="" />
                <span>{device.system_name}</span>
              </div>
              <span className={styles.muted}>
                <span className={styles.capitalize}>
                  {device.type?.toLowerCase()}
                </span>
                <span> workstation</span>
                <span> - {device.hdd_capacity} GB</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
