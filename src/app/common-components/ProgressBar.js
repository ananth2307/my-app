const ProgressBar = (props) => {
  const { bgcolor, completed, label,onClick } = props;

  const containerStyles = {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 20,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <>
      <span class="progress-name">{label}</span>
      <span class="pull-right progress-name" style={{ float: "right" }}>
        {completed} %
      </span>
      <div class="progress us-progress" style={containerStyles} onClick={(e)=>{onClick(label)}}>
        <div class="progress-bar" style={fillerStyles}></div>
      </div>
    </>
  );
};

export default ProgressBar;
