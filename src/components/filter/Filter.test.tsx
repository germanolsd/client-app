import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import Filter, { FilterProps } from "./Filter";
import { Device, DeviceType } from "../../api";
import { useSearchParams } from "react-router-dom";

// Mocking useSearchParams hook
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useSearchParams: vi.fn(),
}));

const mockSetSearchParams = vi.fn();

const devices: Device[] = [
  {
    id: "1",
    system_name: "Device_A",
    type: "WINDOWS" as DeviceType,
    hdd_capacity: "500",
  },
  {
    id: "2",
    system_name: "Device_B",
    type: "MAC" as DeviceType,
    hdd_capacity: "1000",
  },
  {
    id: "3",
    system_name: "Device_C",
    type: "LINUX" as DeviceType,
    hdd_capacity: "200",
  },
];

const renderFilter = (props: Partial<FilterProps> = {}) => {
  render(
    <Filter data={devices} {...props}>
      {(filteredData) => (
        <div>
          {filteredData.map((device) => (
            <div key={device.id}>{device.system_name}</div>
          ))}
        </div>
      )}
    </Filter>
  );
};

describe("Filter Component", () => {
  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ search: "", type: "", sort: "" }),
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    mockSetSearchParams.mockClear();
  });

  it("renders the filter component", () => {
    renderFilter();

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(
      screen.getByText("Sort by: HDD Capacity (Ascending)")
    ).toBeInTheDocument();
  });

  it("filters devices based on search text", async () => {
    renderFilter();

    // Simulate user typing in the search input
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Device_A" } });

    await waitFor(() => {
      // After the change, only "Device_A" should be visible
      expect(screen.getByText("Device_A")).toBeInTheDocument();
      expect(screen.queryByText("Device_B")).not.toBeInTheDocument();
      expect(screen.queryByText("Device_C")).not.toBeInTheDocument();
    });
  });

  it("filters devices based on sort order (ascending)", async () => {
    renderFilter({ sort: "asc" });

    // Check that the devices are sorted by HDD capacity in ascending order
    const devicesSortedAsc = screen.getAllByText(/Device_/);
    expect(devicesSortedAsc[0]).toHaveTextContent("Device_C"); // Lowest HDD capacity
    expect(devicesSortedAsc[1]).toHaveTextContent("Device_A");
    expect(devicesSortedAsc[2]).toHaveTextContent("Device_B"); // Highest HDD capacity
  });
});
