import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const BalanceSVG = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21.3333 32.5333H39.9999M21.3333 43.2H33.0133M26.6666 16H37.3333C42.6666 16 42.6666 13.3333 42.6666 10.6667C42.6666 5.33334 39.9999 5.33334 37.3333 5.33334H26.6666C23.9999 5.33334 21.3333 5.33334 21.3333 10.6667C21.3333 16 23.9999 16 26.6666 16Z"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M42.6667 10.72C51.5467 11.2 56 14.48 56 26.6667V42.6667C56 53.3333 53.3333 58.6667 40 58.6667H24C10.6667 58.6667 8 53.3333 8 42.6667V26.6667C8 14.5067 12.4533 11.2 21.3333 10.72"
      stroke="black"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
