import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const DollarSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.672 14.33C8.672 15.62 9.662 16.66 10.892 16.66H13.402C14.472 16.66 15.342 15.75 15.342 14.63C15.342 13.41 14.812 12.98 14.022 12.7L9.992 11.3C9.202 11.02 8.672 10.59 8.672 9.37C8.672 8.25 9.542 7.34 10.612 7.34H13.122C14.352 7.34 15.342 8.38 15.342 9.67M12 6V18"
      stroke="black"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
      stroke="black"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
