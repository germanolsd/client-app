import OverFlowMenu from "./OverFlowMenu";
import type { Device } from "../../api";
import { useState, useRef } from "react";
import styles from "./DevicesList.module.css";

type DeviceListItemProps = {
  device: Device;
  invokeEditModal: (device: Device) => void;
  invokeDeleteModal: (device: Device) => void;
};

type DeviceType = Device["type"];

const iconMap: Record<DeviceType, string> = {
  WINDOWS: "./windows.svg",
  MAC: "./macos.svg",
  LINUX: "./linux.svg",
};

const DeviceListItem = ({
  device,
  invokeEditModal,
  invokeDeleteModal,
}: DeviceListItemProps) => {
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <li key={device.id}>
      <div className={styles.deviceInfo}>
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
      </div>
      <div className={styles.menuContainer}>
        <button
          ref={triggerRef}
          className={styles.menuTrigger}
          onClick={() => setShowOverflowMenu(!showOverflowMenu)}
        >
          <img src="./dotdotdot.svg" alt="menu" />
        </button>
        {showOverflowMenu && (
          <OverFlowMenu
            triggerRef={triggerRef}
            onEditHandler={() => invokeEditModal(device)}
            onDeleteHandler={() => invokeDeleteModal(device)}
          />
        )}
      </div>
    </li>
  );
};

export default DeviceListItem;
