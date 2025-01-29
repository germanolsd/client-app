import { useForm } from "react-hook-form";
import Modal from "./Modal";
import Button from "../button/Button";
import type { Device } from "../../api";
import { deviceTypes } from "../../api";
import { useEffect } from "react";
import FormLine from "../common/FormLine";

type EditDevicesModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Device, "id">) => Promise<void>;
  selectedDevice?: Device;
};

function EditDevicesModal({
  open,
  onClose,
  onSubmit,
  selectedDevice,
}: EditDevicesModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Device, "id">>();

  useEffect(() => {
    if (open && !selectedDevice) {
      reset();
    } else if (selectedDevice) {
      reset({
        system_name: selectedDevice.system_name,
        type: selectedDevice.type,
        hdd_capacity: selectedDevice.hdd_capacity,
      });
    }
  }, [open, selectedDevice]);

  const onCloseHandler = () => {
    reset({
      system_name: "",
      type: undefined,
      hdd_capacity: "",
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onCloseHandler}
      title={selectedDevice ? "Edit Device" : "Add Device"}
      actionButton={
        <Button onClick={handleSubmit(onSubmit)}>{"Submit"}</Button>
      }
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

export default EditDevicesModal;
