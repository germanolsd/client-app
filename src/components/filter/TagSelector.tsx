import { DeviceType } from "../../api";
import styles from "./Filter.module.css";
import { useOnClickOutside } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";

type TagSelectorProps = {
  options: DeviceType[];
  selected: DeviceType[];
  onSelect: (selected: DeviceType[]) => void;
};

const TagSelector = ({ options, selected, onSelect }: TagSelectorProps) => {
  const optionsSet = new Set(options);
  const selectedSet = new Set(selected);
  const unselectedOptions = Array.from(optionsSet).filter(
    (option) => !selectedSet.has(option)
  );

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    console.log("showDropdown", showDropdown);
  }, [showDropdown]);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setShowDropdown(false));

  const openDropdown = () => {
    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  const removeSelectedOption = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    option: DeviceType
  ) => {
    e.stopPropagation();
    //prevents dropdown from opening when removing options
    onSelect(selected.filter((selectedOption) => selectedOption !== option));
  };

  const addSelectedOption = (option: DeviceType) => {
    onSelect([...selected, option]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input} onClick={openDropdown}>
        <span>Device type: {selected.length === 0 ? "All" : null}</span>
        {selected.map((option) => (
          <div
            key={option}
            onClick={(e) => removeSelectedOption(e, option)}
            aria-label={`click to remove ${option} option`}
            className={`${styles.chip} ${styles.selected}`}
          >
            {option}
          </div>
        ))}
      </div>
      {showDropdown && (
        <div className={styles.dropDown} ref={ref}>
          {unselectedOptions.map((option) => (
            <div
              key={option}
              onClick={() => addSelectedOption(option)}
              className={styles.chip}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
