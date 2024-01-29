import { ReactNode } from "react";

interface IBlankLayout{
  children : ReactNode
}

const BlankLayout = ({children}: IBlankLayout) => {
  return children
}

export default BlankLayout;
