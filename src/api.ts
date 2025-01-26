import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export type Device = {
  id: string;
  system_name: string;
  type: "WINDOWS" | "LINUX" | "MAC";
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

export default api;
