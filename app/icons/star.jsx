import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const StarSVG = (props) => {
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
        d="M13.664 3.695c-.524-1.612-2.804-1.612-3.328 0L9.042 7.678a.25.25 0 0 1-.238.173H4.616c-1.695 0-2.4 2.17-1.029 3.166l3.388 2.461a.25.25 0 0 1 .091.28L5.772 17.74c-.524 1.613 1.322 2.953 2.693 1.957l3.388-2.462a.25.25 0 0 1 .294 0l3.388 2.462c1.371.996 3.217-.344 2.693-1.957l-1.294-3.982a.25.25 0 0 1 .09-.28l3.389-2.461c1.371-.997.666-3.166-1.03-3.166h-4.187a.25.25 0 0 1-.238-.173l-1.294-3.983Z"
        fill="#FFC44D"
      />
    </Svg>
)}

