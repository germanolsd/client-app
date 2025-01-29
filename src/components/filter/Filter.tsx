import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { deviceTypes } from "../../api";

type FilterProps = {
  onFilter: (state: FilterState) => void;
};

type FilterState = {
  searchText: string;
  deviceType: string;
  sortOrder: string;
};

const Filter = ({ onFilter }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialState = (): FilterState => {
    return {
      searchText: searchParams.get("search") || "",
      deviceType: searchParams.get("type") || "",
      sortOrder: searchParams.get("sort") || "asc",
    };
  };

  const [formData, setFormData] = useState<FilterState>(getInitialState());

  useEffect(() => {
    onFilter(formData);

    // Update URL params
    const params: { [key: string]: string } = {};
    if (formData.searchText) params.search = formData.searchText;
    if (formData.deviceType) params.type = formData.deviceType;
    if (formData.sortOrder) params.sort = formData.sortOrder;

    setSearchParams(params);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        >
          <option value="">All</option>
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
