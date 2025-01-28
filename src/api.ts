import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export type DeviceType = "WINDOWS" | "MAC" | "LINUX";

export const deviceTypes: DeviceType[] = ["WINDOWS", "MAC", "LINUX"];

export type Device = {
  id: string;
  system_name: string;
  type: DeviceType;
  hdd_capacity: string;
};

const delay = (ms = 1100) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDevices = async (): Promise<Device[]> => {
  await delay();
  const response = await api.get("/devices");
  return response.data;
};

export const fetchDeviceById = async (id: string): Promise<Device> => {
  await delay();
  const response = await api.get(`/devices/${id}`);
  return response.data;
};

export const createDevice = async (
  device: Omit<Device, "id">
): Promise<Device> => {
  await delay();
  const response = await api.post("/devices", device);
  return response.data;
};

export const updateDevice = async (
  id: string,
  device: Omit<Device, "id">
): Promise<Device> => {
  await delay();
  const response = await api.put(`/devices/${id}`, device);
  return response.data;
};

export default api;
