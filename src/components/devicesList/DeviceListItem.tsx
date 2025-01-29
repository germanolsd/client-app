import OverFlowMenu from "./OverFlowMenu";
import type { Device } from "../../api";
import { useState, useRef } from "react";
import styles from "./DevicesList.module.css";
import { useOnClickOutside } from "usehooks-ts";

type DeviceListItemProps = {
  device: Device;
  openEditModal: (device: Device) => void;
  openDeleteModal: (device: Device) => void;
};

type DeviceType = Device["type"];

const iconMap: Record<DeviceType, string> = {
  WINDOWS: "./windows.svg",
  MAC: "./macos.svg",
  LINUX: "./linux.svg",
};

const DeviceListItem = ({
  device,
  openEditModal,
  openDeleteModal,
}: DeviceListItemProps) => {
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowOverflowMenu(false));

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
          className={`${styles.menuTrigger} ${
            showOverflowMenu ? styles.active : ""
          }`}
          onClick={() => setShowOverflowMenu(!showOverflowMenu)}
        >
          <img src="./dotdotdot.svg" alt="menu" />
        </button>
        {showOverflowMenu && (
          <div ref={ref}>
            <OverFlowMenu
              triggerRef={triggerRef}
              onEditHandler={() => {
                openEditModal(device);
                setShowOverflowMenu(false);
              }}
              onDeleteHandler={() => {
                openDeleteModal(device);
                setShowOverflowMenu(false);
              }}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default DeviceListItem;
