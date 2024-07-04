import { CSSProperties, ReactNode, Dispatch, SetStateAction } from "react";
import { StackblitzProps } from "../../content/structured/patterns/components/StackblitzButton";
import "./index.css";

export interface Snippet {
  code: {
    shortCode: string | undefined;
    longCode: string | undefined;
  };
}

export interface ComponentTestingProps extends Partial<StackblitzProps> {
  snippets: Snippet[];
  left?: boolean;
  noPadding?: boolean;
  centered?: boolean;
  children: ReactNode;
  style: CSSProperties;
  showStackblitzBtn: boolean;
  type?: string;
}

export interface ActionProps extends Partial<StackblitzProps> {
  longCode: string;
  type?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  showStackblitzBtn?: boolean;
  isLargeViewport: boolean;
}

export interface ToggleShowProps {
  type?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  isLargeViewport: boolean;
}

export interface CodeWindowProps {
  code: string;
  show: boolean;
}
