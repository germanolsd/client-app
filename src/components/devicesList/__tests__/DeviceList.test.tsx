import { render, screen } from "@testing-library/react";
import DevicesList from "../DevicesList";
import { vi } from "vitest";
import { Device } from "../../../api";

describe("DevicesList Component", () => {
  // Mocks for the modals
  const openEditModal = vi.fn();
  const openDeleteModal = vi.fn();

  it("displays loading message when isLoading is true", () => {
    render(
      <DevicesList
        items={undefined}
        isLoading={true}
        error={false}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("displays error message when error is true", () => {
    render(
      <DevicesList
        items={undefined}
        isLoading={false}
        error={true}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
    );
    expect(screen.getByText(/Error loading devices/i)).toBeInTheDocument();
  });

  it("renders a list of devices when items are available", () => {
    const devices: Device[] = [
      {
        id: "1",
        system_name: "Device 1",
        type: "WINDOWS",
        hdd_capacity: "512GB",
      },
      { id: "2", system_name: "Device 2", type: "MAC", hdd_capacity: "1TB" },
    ];

    render(
      <DevicesList
        items={devices}
        isLoading={false}
        error={false}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
    );

    expect(screen.getByText(/Device 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Device 2/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(devices.length);
  });
});
