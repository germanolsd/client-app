import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

/** Represents the supported device operating system types */
export type DeviceType = "WINDOWS" | "MAC" | "LINUX";

/** Array of available device types */
export const deviceTypes: DeviceType[] = ["WINDOWS", "MAC", "LINUX"];

/** Interface representing a device entity */
export type Device = {
  /** Unique identifier of the device */
  id: string;
  /** Name of the device's system */
  system_name: string;
  /** Operating system type of the device */
  type: DeviceType;
  /** Hard disk drive capacity of the device */
  hdd_capacity: string;
};

/**
 * Simulates network latency by delaying the execution
 * @param {number} ms - Delay time in milliseconds
 * @returns {Promise<void>}
 */
const delay = (ms = 1100) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches all devices from the API
 * @returns {Promise<Device[]>} Array of devices
 */
export const fetchDevices = async (): Promise<Device[]> => {
  await delay();
  const response = await api.get("/devices");
  return response.data;
};

/**
 * Fetches a specific device by its ID
 * @param {string} id - The ID of the device to fetch
 * @returns {Promise<Device>} The requested device
 */
export const fetchDeviceById = async (id: string): Promise<Device> => {
  await delay();
  const response = await api.get(`/devices/${id}`);
  return response.data;
};

/**
 * Creates a new device
 * @param {Omit<Device, "id">} device - The device data without ID
 * @returns {Promise<Device>} The created device with assigned ID
 */
export const createDevice = async (
  device: Omit<Device, "id">
): Promise<Device> => {
  await delay();
  const response = await api.post("/devices", device);
  return response.data;
};

/**
 * Updates an existing device
 * @param {string} id - The ID of the device to update
 * @param {Omit<Device, "id">} device - The updated device data
 * @returns {Promise<Device>} The updated device
 */
export const updateDevice = async (
  id: string,
  device: Omit<Device, "id">
): Promise<Device> => {
  await delay();
  const response = await api.put(`/devices/${id}`, device);
  return response.data;
};

/**
 * Deletes a device by its ID
 * @param {string} id - The ID of the device to delete
 * @returns {Promise<boolean>} True if deletion was successful, false otherwise
 */
export const deleteDevice = async (id: string): Promise<boolean> => {
  try {
    await delay();
    await api.delete(`/devices/${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete device:", error);
    return false;
  }
};

export default api;
