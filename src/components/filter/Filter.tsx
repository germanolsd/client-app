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
  const getInitialState = (): FilterState => {
    const typeParam = searchParams.get("type");
    return {
      searchText: searchParams.get("search") || "",
      deviceType: typeParam ? (typeParam.split(",") as DeviceType[]) : [],
      sortOrder: searchParams.get("sort") || "asc",
    };
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState<Device[]>([]);
  const [filterState, setFilterState] = useState<FilterState>(
    getInitialState()
  );

  function getFilteredData() {
    let filteredData = data;
    if (filterState.deviceType?.length) {
      filteredData = data.filter((device) =>
        filterState.deviceType.includes(device.type)
      );
    }
    if (filterState.searchText) {
      filteredData = filteredData.filter((device) =>
        device.system_name
          .toLowerCase()
          .includes(filterState.searchText.toLowerCase())
      );
    }

    filteredData = filteredData.sort((a, b) => {
      const numA = parseInt(a.hdd_capacity);
      const numB = parseInt(b.hdd_capacity);
      return filterState.sortOrder === "asc" ? numA - numB : numB - numA;
    });
    return filteredData;
  }

  useEffect(() => {
    // Update URL params
    const params: { [key: string]: string } = {};
    if (filterState.searchText) params.search = filterState.searchText;
    if (filterState.deviceType.length)
      params.type = filterState.deviceType.join(",");
    if (filterState.sortOrder) params.sort = filterState.sortOrder;

    setSearchParams(params);

    setFilteredData(getFilteredData());
  }, [filterState, setSearchParams, data]);

  const deviceTypeValues = deviceTypes;
  const ascDescValue = [
    { value: "asc", label: "Sort by: HDD Capacity (Ascending)" },
    { value: "desc", label: "Sort by: HDD Capacity (Descending)" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({
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
            value={filterState.searchText}
            onChange={handleInputChange}
            placeholder="Search"
            className="globalInputSelectStyle"
          />

          <TagSelector
            options={deviceTypeValues}
            selected={filterState.deviceType}
            onSelect={(selected) => {
              setFilterState((prev) => ({
                ...prev,
                deviceType: selected,
              }));
            }}
          />

          <select
            name="sortOrder"
            value={filterState.sortOrder}
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
