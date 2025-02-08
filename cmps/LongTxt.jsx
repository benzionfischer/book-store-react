const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <p>
      {isExpanded ? txt : txt.slice(0, length) + (txt.length > length ? "..." : "")}
      {txt.length > length && (
        <button onClick={toggleExpand} style={{ marginLeft: "5px", color: "blue", cursor: "pointer", border: "none", background: "none" }}>
          {isExpanded ? " Read Less" : " Read More"}
        </button>
      )}
    </p>
  );
}
