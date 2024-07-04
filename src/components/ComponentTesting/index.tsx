import Highlight, { defaultProps } from "prism-react-renderer";
import React, { useState } from "react";
import { mdiContentCopy, mdiMenuDown, mdiMenuUp } from "@mdi/js";
import clsx from "clsx";
import { IcButton, SlottedSVG } from "@ukic/react";
import TestingStackblitzButton from "../../content/structured/patterns/components/TestingStackblitzButton";
import { useViewportWidth } from "../../utils/helpers";
import "./index.css";
import {
  ComponentTestingProps,
  ActionProps,
  CodeWindowProps,
  ToggleShowProps,
} from "./types";

const ActionButtons: React.FC<ActionProps> = ({
  longCode,
  showStackblitzBtn,
  projectTitle,
  projectDescription,
  isLargeViewport,
}) => (
  <div className="button-container">
    {showStackblitzBtn && projectTitle !== undefined && (
      <TestingStackblitzButton
        codeSnippet={longCode}
        projectTitle={projectTitle}
        projectDescription={projectDescription}
      />
    )}
    <IcButton
      aria-label={isLargeViewport ? "" : "Copy code"}
      variant={isLargeViewport ? "tertiary" : "icon"}
      size={isLargeViewport ? "small" : "default"}
      appearance="dark"
      onClick={() => {
        navigator.clipboard.writeText(code);
        document
          .querySelector<HTMLIcToastElement>("#copy-to-clipboard-toast")
          ?.setVisible();
      }}
    >
      <SlottedSVG
        path={mdiContentCopy}
        slot={isLargeViewport ? "left-icon" : undefined}
        viewBox="0 0 24 24"
        width="24"
        height="24"
      />
      {isLargeViewport && "Copy code"}
    </IcButton>
  </div>
);

const ToggleShowButton: React.FC<ToggleShowProps> = ({
  type,
  show,
  setShow,
  showMore,
  setShowMore,
}) => (
  <div className="button-container">
    {type === "pattern" && (
      <IcButton
        variant="tertiary"
        size="small"
        onClick={() => setShow(!show)}
        appearance="dark"
      >
        {!show ? "Show" : "Hide"} code
        <SlottedSVG
          slot="right-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          path={!show ? mdiMenuDown : mdiMenuUp}
        />
      </IcButton>
    )}
    {type !== "pattern" && (
      <IcButton
        variant="tertiary"
        size="small"
        onClick={() => setShowMore(!showMore)}
        appearance="dark"
      >
        Show {showMore ? "less" : "full "} code
        <SlottedSVG
          slot="right-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          path={showMore ? mdiMenuUp : mdiMenuDown}
        />
      </IcButton>
    )}
  </div>
);

const CodeWindow: React.FC<CodeWindowProps> = ({ code, show }) => (
  <div>
    {show && (
      <Highlight {...defaultProps} code={code} language="jsx" theme={undefined}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={clsx(className, "snippet")} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    )}
  </div>
);

const ComponentTesting: React.FC<ComponentTestingProps> = ({
  showStackblitzBtn = true,
  projectTitle,
  projectDescription,
  type,
  snippets
}) => {
  const viewportWidth = useViewportWidth();
  const isLargeViewport: boolean = viewportWidth > 992;

  // Show/hide functionality for pattern code previews
  const [show, setShow] = useState<boolean>(type !== "pattern");
  // Show more/less functionality for component code previews
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div>
      <div className="link-zone snippet-container">
        <ActionButtons
          type={type}
          longCode={snippets.code.longCode}
          show={show}
          setShow={setShow}
          showMore={showMore}
          setShowMore={setShowMore}
          showStackblitzBtn={showStackblitzBtn}
          projectTitle={projectTitle}
          projectDescription={
            projectDescription === undefined || projectDescription === ""
              ? undefined
              : projectDescription
          }
          isLargeViewport={isLargeViewport}
        />
        <ToggleShowButton
          type={type}
          show={show}
          setShow={setShow}
          showMore={showMore}
          setShowMore={setShowMore}
          isLargeViewport={isLargeViewport}
        />
      </div>
        <CodeWindow code={snippets.code.longCode} show={show} />
    </div>
  );
};

export default ComponentTesting;
