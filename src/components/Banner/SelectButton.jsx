function SeclectButton({ children, onCLick, onSelected }) {
  return (
    <>
      <button
        style={{
          padding: "10px",
          cursor: "pointer",
          border: "1px solid white",
          backgroundColor: onSelected ? "#EEBC1D" : "transparent",
          color: onSelected ? "black" : "white",
          borderRadius: "5px",
        }}
        onClick={onCLick}
        onSelected={onSelected}
      >
        {children}
      </button>
    </>
  );
}

export default SeclectButton;
