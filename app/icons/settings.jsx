import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const SettingsSVG = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8 24.2933V39.68C8 45.3333 8 45.3333 13.3333 48.9333L28 57.4133C30.2133 58.6933 33.8133 58.6933 36 57.4133L50.6667 48.9333C56 45.3333 56 45.3333 56 39.7067V24.2933C56 18.6667 56 18.6667 50.6667 15.0667L36 6.58668C33.8133 5.30668 30.2133 5.30668 28 6.58668L13.3333 15.0667C8 18.6667 8 18.6667 8 24.2933Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M32 40C34.1217 40 36.1566 39.1571 37.6569 37.6569C39.1571 36.1566 40 34.1217 40 32C40 29.8783 39.1571 27.8434 37.6569 26.3431C36.1566 24.8429 34.1217 24 32 24C29.8783 24 27.8434 24.8429 26.3431 26.3431C24.8429 27.8434 24 29.8783 24 32C24 34.1217 24.8429 36.1566 26.3431 37.6569C27.8434 39.1571 29.8783 40 32 40Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

