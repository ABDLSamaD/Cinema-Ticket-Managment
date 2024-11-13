import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ varient = "filled", children }) => {
  return (
    <Stack
      sx={{
        width: "50%",
        margin: "6px auto 0px auto",
        position: "absolute",
        top: "4rem",
        left: "20rem",
        padding: "10px",
      }}
    >
      <Alert severity="error" variant={varient} style={{ fontSize: "20px" }}>
        <strong> {children} </strong>
      </Alert>
    </Stack>
  );
};

export default ErrorMessage;
