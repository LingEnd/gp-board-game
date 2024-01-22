import { SvgIcon } from "@mui/material";

type props = {
  sx?: any;
};

const Logo = ({ sx }: props) => {
  return (
    <SvgIcon sx={sx}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 47.5 47.5"
        viewBox="0 0 47.5 47.5"
        id="peach"
      >
        <defs>
          <clipPath id="a">
            <path d="M0 38h38V0H0v38Z"></path>
          </clipPath>
        </defs>
        <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
          <path
            fill="#5c913b"
            d="M0 0s4.875 5 10 5C16.125 5 17.937.062 17.937.062s.625 4 5 4S29.875.937 29.875.937s-3.563-2.124-4.625-2.562C22.449-2.778 13.875-5.187 9.875-4.187 5.875-3.188 0 0 0 0"
            transform="translate(2.063 31.875)"
          ></path>
          <path
            fill="#ffa996"
            d="M0 0s1.042.896 6 .896c6.542 0 12-4.813 12-12.927C18-23.562 3.042-29.912 3.042-29.912S-17-28.833-17-11.977C-17-2.018-10.25 1-6 1c4.958 0 6-1 6-1"
            transform="translate(19 31)"
          ></path>
          <path
            fill="#77b255"
            d="M0 0s4.875 5 10 5C16.125 5 17.937.062 17.937.062s-4.062-5.249-8.062-4.249C5.875-3.188 0 0 0 0"
            transform="translate(2.063 31.875)"
          ></path>
          <path
            fill="#dd2e44"
            d="M0 0a1 1 0 0 0-.831 1.555c.015.022 1.832 2.907 1.832 9.445 0 6.445-4.578 10.182-4.625 10.219a1 1 0 0 0 1.25 1.562c.219-.176 5.375-4.385 5.375-11.781C3.001 3.78.922.578.833.445A.998.998 0 0 0 0 0"
            transform="translate(23.999 7)"
          ></path>
        </g>
      </svg>
    </SvgIcon>
  );
};

export default Logo;