import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const FlashSVG = (props) => {
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
      d="M5.5 1.25a.75.75 0 0 0-.75.75v11c0 .414.336.75.75.75h3.25V22a.75.75 0 0 0 1.367.427l9-13A.75.75 0 0 0 18.5 8.25h-3.135l.877-6.144a.75.75 0 0 0-.742-.856h-10Z"
      fill="#FFC44D"
    />
  </Svg>
)}
