function CustomIcon(props: any) {
  return (
    <span
      className={props?.iconClass ?? ""}
      style={{
        backgroundImage: `url(${props.bg})`,
        height: props?.size ?? "20px",
        width: props?.size ?? "20px",
        display: "flex",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: "auto",
      }}
    ></span>
  );
}

export default CustomIcon;
