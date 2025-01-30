import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Device, DeviceType, deviceTypes } from "../../api";
import TagSelector from "./TagSelector";
import styles from "./Filter.module.css";

export type FilterProps = {
  data: Device[];
  children: (data: Device[]) => React.ReactNode;
};

export type FilterState = {
  searchText: string;
  deviceType: DeviceType[];
  sortOrder: string;
};

const Filter = ({ data, children }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState<Device[]>([]);

  const getInitialState = (): FilterState => {
    const typeParam = searchParams.get("type");
    return {
      searchText: searchParams.get("search") || "",
      deviceType: typeParam ? (typeParam.split(",") as DeviceType[]) : [],
      sortOrder: searchParams.get("sort") || "asc",
    };
  };

  function applyDataFilters() {
    let filteredData = data;
    if (formData.deviceType?.length) {
      filteredData = data.filter((device) =>
        formData.deviceType.includes(device.type)
      );
    }
    if (formData.searchText) {
      filteredData = filteredData.filter((device) =>
        device.system_name
          .toLowerCase()
          .includes(formData.searchText.toLowerCase())
      );
    }

    filteredData = filteredData.sort((a, b) => {
      const numA = parseInt(a.hdd_capacity);
      const numB = parseInt(b.hdd_capacity);
      return formData.sortOrder === "asc" ? numA - numB : numB - numA;
    });
    return filteredData;
  }

  const [formData, setFormData] = useState<FilterState>(getInitialState());

  useEffect(() => {
    // Update URL params
    const params: { [key: string]: string } = {};
    if (formData.searchText) params.search = formData.searchText;
    if (formData.deviceType.length) params.type = formData.deviceType.join(",");
    if (formData.sortOrder) params.sort = formData.sortOrder;

    setSearchParams(params);

    // Filter data
    setFilteredData(applyDataFilters());
  }, [formData, setSearchParams, data]);

  const deviceTypeValues = deviceTypes;
  const ascDescValue = [
    { value: "asc", label: "Sort by: HDD Capacity (Ascending)" },
    { value: "desc", label: "Sort by: HDD Capacity (Descending)" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <form>
          <input
            type="text"
            name="searchText"
            value={formData.searchText}
            onChange={handleInputChange}
            placeholder="Search"
            className="globalInputSelectStyle"
          />

          <TagSelector
            options={deviceTypeValues}
            selected={formData.deviceType}
            onSelect={(selected) => {
              setFormData((prev) => ({
                ...prev,
                deviceType: selected,
              }));
            }}
          />

          <select
            name="sortOrder"
            value={formData.sortOrder}
            onChange={handleInputChange}
            aria-label="Sort order"
            className="globalInputSelectStyle"
          >
            {ascDescValue.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </form>
      </div>
      {children(filteredData)}
    </>
  );
};

export default Filter;
