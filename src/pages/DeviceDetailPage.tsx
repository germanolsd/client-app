import useSWR from "swr";
import { fetchDevices } from "../api";
import { type Device } from "../api";

const DeviceDetailPage: React.FC = () => {
  const { data, error, isLoading } = useSWR<Device[]>("/devices", fetchDevices);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading devices</div>;

  return (
    <div>
      <h1>Device List</h1>
      <ul>
        {data?.map((device) => (
          <li key={device.id}>{device.system_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceDetailPage;
