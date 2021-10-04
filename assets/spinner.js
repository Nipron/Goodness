import * as React from "react"
import Svg, { SvgProps, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: animate */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "0 0",
      }}
      width={200}
      height={200}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      {...props}
    >
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(30 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(60 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(90 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(120 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(150 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(180 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(210 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(240 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(270 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(300 50 50)"
      ></Rect>
      <Rect
        x={47}
        y={24}
        rx={3}
        ry={6}
        width={6}
        height={12}
        fill="#8822d9"
        transform="rotate(330 50 50)"
      ></Rect>
    </Svg>
  )
}

export default SvgComponent