import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const DocumentSVG = (props) => {
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
      d="M6 2.5A1.5 1.5 0 0 0 4.5 4v16A1.5 1.5 0 0 0 6 21.5h12a1.5 1.5 0 0 0 1.5-1.5V8.92a1.5 1.5 0 0 0-.524-1.139l-5.74-4.92a1.5 1.5 0 0 0-.976-.361H6ZM3.5 4A2.5 2.5 0 0 1 6 1.5h6.26a2.5 2.5 0 0 1 1.627.602l5.74 4.92A2.5 2.5 0 0 1 20.5 8.92V20a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 20V4Z"
      fill="#919191"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 6V2.5h1V6A1.5 1.5 0 0 0 15 7.5h4.5v1H15A2.5 2.5 0 0 1 12.5 6ZM15 12.5H7v-1h8v1ZM11.5 15.5H7v-1h4.5v1ZM14 18.5H7v-1h7v1Z"
      fill="#919191"
    />
  </Svg>
)}
