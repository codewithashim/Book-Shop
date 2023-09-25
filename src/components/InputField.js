import React, { useEffect, useState } from "react";
import "../modules/Styles/inputField.css";
export default function InputField({ data, updatedValue, userData }) {
  const [updateValue, setUpdateValue] = useState("");

  useEffect(() => {
    updatedValue(data?.heading, updateValue);
  }, [updateValue]);

  return (
    <div className="inputField">
      <div>
        <div>{data?.heading}</div>
        <input
          onChange={(e) => setUpdateValue(e.target.value)}
          placeholder={data?.placeholder}
          type="text"
        />
      </div>
    </div>
  );
}
