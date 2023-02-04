import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const AccountSVG = (props) => {
  return (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M26.086 24l-6.293 6.293 1.414 1.414 7-7a1 1 0 000-1.414l-7-7-1.414 1.414L26.086 24z"
      clipRule="evenodd"
    />
  </Svg>
)}
