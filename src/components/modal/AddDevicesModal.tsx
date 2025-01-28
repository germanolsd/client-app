import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../button/Button";
import type { Device } from "../../api";
import { deviceTypes } from "../../api";
import { useEffect } from "react";
import FormLine from "../common/FormLine";

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
    reset,
  } = useForm<Omit<Device, "id">>();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Device"
      actionButton={<Button onClick={handleSubmit(onSubmit)}>Submit</Button>}
    >
      <form>
        <FormLine
          label="System name *"
          errorMessage={errors.system_name?.message}
        >
          <input
            className="globalInputSelectStyle"
            autoComplete="never"
            {...register("system_name", {
              required: "System name is required",
            })}
            placeholder="System Name"
          />
        </FormLine>

        <FormLine label="Device Type *" errorMessage={errors.type?.message}>
          <select
            className="globalInputSelectStyle"
            {...register("type", { required: "Type is required" })}
          >
            <option value="">Select Type</option>
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormLine>

        <FormLine
          label="HDD Capacity *"
          errorMessage={errors.hdd_capacity?.message}
        >
          <input
            className="globalInputSelectStyle"
            {...register("hdd_capacity", {
              required: "HDD Capacity is required",
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid number",
              },
            })}
            placeholder="HDD Capacity (GB)"
          />
        </FormLine>
      </form>
    </Modal>
  );
}

export default AddDevicesModal;
