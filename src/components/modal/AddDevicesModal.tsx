import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../button/Button";
import type { Device } from "../../api";
import { deviceTypes } from "../../api";

type AddDevicesModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Device, "id">) => Promise<void>;
};

function AddDevicesModal({ open, onClose, onSubmit }: AddDevicesModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Device, "id">>();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Device"
      actionButton={<Button onClick={handleSubmit(onSubmit)}>Submit</Button>}
    >
      <form>
        <div>
          <input
            {...register("system_name", {
              required: "System name is required",
            })}
            placeholder="System Name"
          />
          {errors.system_name && <span>{errors.system_name.message}</span>}
        </div>

        <div>
          <select {...register("type", { required: "Type is required" })}>
            <option value="">Select Type</option>
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && <span>{errors.type.message}</span>}
        </div>

        <div>
          <input
            {...register("hdd_capacity", {
              required: "HDD Capacity is required",
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number",
              },
            })}
            placeholder="HDD Capacity (GB)"
          />
          {errors.hdd_capacity && <span>{errors.hdd_capacity.message}</span>}
        </div>
      </form>
    </Modal>
  );
}

export default AddDevicesModal;
