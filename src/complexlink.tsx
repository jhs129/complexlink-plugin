import React, { useState, ChangeEvent, FC } from "react";

interface ComplexLinkProps {
  value: {
    link: string;
    link2: string;
  };
  onChange: (value: { link: string; link2: string }) => void;
}

const ComplexLink: React.FC<ComplexLinkProps> = (props) => {
  const [type, setType] = useState("model");

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    props.onChange({
      ...props.value,
      [id]: value,
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <label style={{ gridColumn: "1 / 2" }}>Link Type:</label>
      <select
        id="type"
        style={{ gridColumn: "2 / 3" }}
        value={type}
        onChange={handleTypeChange}
      >
        <option value="model">Model</option>
        <option value="url">URL</option>
      </select>
      {type === "url" && (
        <>
          <label style={{ gridColumn: "1 / 2" }}>Enter Url:</label>
          <input
            id="link"
            style={{ gridColumn: "2 / 3" }}
            type="text"
            value={props.value.link}
            onChange={handleChange}
          />
          <label style={{ gridColumn: "1 / 2" }}>Enter Url 2:</label>
          <input
            id="link2"
            style={{ gridColumn: "2 / 3" }}
            type="text"
            value={props.value.link2}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default ComplexLink;
