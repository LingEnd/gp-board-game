import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

const MaterialUISwitch = styled(Switch)(() => ({
  width: 200,
  height: 100,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(0px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(75px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: "url('/assets/logo.svg')",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 100,
    height: 100,
    backgroundColor: "rgba(0,0,0,0)",
    boxShadow: "none",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: "url('/assets/logo.svg')",
      backgroundSize: "cover",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    height: 50,
    width: 150,
    marginLeft: 5,
    marginTop: 20,
    borderRadius: 20 / 1,
  },
}));

const LoginSwitcher = ({ onChange, checked }: Props) => {
  return (
    <MaterialUISwitch checked={checked} sx={{ m: 1 }} onChange={onChange} />
  );
};

export default LoginSwitcher;
