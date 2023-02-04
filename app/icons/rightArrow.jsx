import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const RightArrowSVG = (props) => {
  return (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.043 12 9.896 8.854l.708-.708 3.5 3.5a.5.5 0 0 1 0 .707l-3.5 3.5-.708-.707L13.043 12Z"
      fill="#919191"
    />
  </Svg>
)}
