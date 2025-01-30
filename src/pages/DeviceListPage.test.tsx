import { render, screen, fireEvent } from "@testing-library/react";
import { Mock, vi } from "vitest";
import useSWR from "swr";
import DeviceListPage from "./DeviceListPage";
import { type Device } from "../api";

vi.mock("swr");
vi.mock("../api");
vi.mock("../components/topBar/TopBar", () => ({
  default: () => <div>TopBar</div>,
}));
vi.mock("../components/titleBar/TitleBar", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("../components/button/Button", () => ({
  default: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));
vi.mock("../components/common/PlusIcon", () => ({
  default: () => <span>PlusIcon</span>,
}));
vi.mock("../components/devicesList/DevicesList", () => ({
  default: ({
    items,
    isLoading,
    error,
    openDeleteModal,
    openEditModal,
  }: {
    items: Device[];
    isLoading: boolean;
    error: any;
    openDeleteModal: (device: Device) => void;
    openEditModal: (device: Device) => void;
  }) => (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {items.map((device) => (
        <div key={device.id}>
          {device.system_name}
          <button onClick={() => openEditModal(device)}>Edit</button>
          <button onClick={() => openDeleteModal(device)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));
vi.mock("../components/modal/EditDevicesModal", () => ({
  default: ({
    open,
  }: {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    selectedDevice: Device;
  }) => (open ? <div>EditDevicesModal</div> : null),
}));
vi.mock("../components/modal/DeleteDeviceModal", () => ({
  default: ({
    open,
  }: {
    open: boolean;
    onClose: () => void;
    handleDeleteDevice: () => void;
    selectedDevice: Device;
  }) => (open ? <div>DeleteDeviceModal</div> : null),
}));
vi.mock("../components/filter/Filter", () => ({
  default: ({
    data,
    children,
  }: {
    data: Device[];
    children: (data: Device[]) => React.ReactNode;
  }) => children(data),
}));

describe("DeviceListPage", () => {
  const mockDevices: Device[] = [
    { id: "1", system_name: "Device 1", type: "WINDOWS", hdd_capacity: "500" },
    { id: "2", system_name: "Device 2", type: "MAC", hdd_capacity: "256" },
  ];

  beforeEach(() => {
    (useSWR as Mock).mockReturnValue({
      data: mockDevices,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
    });
  });

  it("renders the DeviceListPage with devices", () => {
    render(<DeviceListPage />);

    expect(screen.getByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("Device 2")).toBeInTheDocument();
  });

  it("opens the EditDevicesModal when Add device button is clicked", () => {
    render(<DeviceListPage />);
    fireEvent.click(screen.getByText("Add device"));
    expect(screen.getByText("EditDevicesModal")).toBeInTheDocument();
  });

  it("opens the EditDevicesModal when Edit button is clicked", () => {
    render(<DeviceListPage />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(screen.getByText("EditDevicesModal")).toBeInTheDocument();
  });

  it("opens the DeleteDeviceModal when Delete button is clicked", () => {
    render(<DeviceListPage />);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(screen.getByText("DeleteDeviceModal")).toBeInTheDocument();
  });
});
