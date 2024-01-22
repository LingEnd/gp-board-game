import { Tooltip, IconButton } from "@mui/material";

type Props = {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const AppBarButton = (props: Props) => {
  return (
    <Tooltip title={props.title} onClick={props.onClick}>
      <IconButton
        sx={{ mr: "7px", border: "solid 2px", borderRadius: "12px", p: "4px" }}
        children={props.children}
      ></IconButton>
    </Tooltip>
  );
};

export default AppBarButton;
