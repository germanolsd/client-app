import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Device, deviceTypes } from "../../api";

type FilterProps = {
  data: Device[];
  onFilter: (data: Device[]) => void;
};

export type FilterState = {
  searchText: string;
  deviceType: string[];
  sortOrder: string;
};

const Filter = ({ onFilter, data }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialState = (): FilterState => {
    const typeParam = searchParams.get("type");
    return {
      searchText: searchParams.get("search") || "",
      deviceType: typeParam ? typeParam.split(",") : [],
      sortOrder: searchParams.get("sort") || "asc",
    };
  };

  const [formData, setFormData] = useState<FilterState>(getInitialState());

  useEffect(() => {
    // Update URL params
    const params: { [key: string]: string } = {};
    if (formData.searchText) params.search = formData.searchText;
    if (formData.deviceType.length) params.type = formData.deviceType.join(",");
    if (formData.sortOrder) params.sort = formData.sortOrder;

    setSearchParams(params);

    // Filter data
    let filteredData = data;
    if (formData.deviceType?.[0]?.toLowerCase() !== "all") {
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

    onFilter(filteredData);
  }, [formData, setSearchParams]);

  const deviceTypeValues = deviceTypes;
  const ascDescValue = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "deviceType") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
        (option) => option.value
      );
      console.log("updating devicetyoe filter");
      console.log(selectedOptions);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="filter-container">
      <form>
        <input
          type="text"
          name="searchText"
          value={formData.searchText}
          onChange={handleInputChange}
          placeholder="Search"
          className="globalInputSelectStyle"
        />

        <select
          name="deviceType"
          value={formData.deviceType}
          onChange={handleInputChange}
          className="globalInputSelectStyle"
          multiple
        >
          <option value="all">All</option>
          {deviceTypeValues.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

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
  );
};

export default Filter;
