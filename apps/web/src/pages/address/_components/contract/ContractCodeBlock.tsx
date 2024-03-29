import GradientCardContainer from "@components/commons/GradientCardContainer";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FiCopy, FiShare2, FiMaximize, FiMinimize } from "react-icons/fi";
import { sleep } from "shared/sleep";
import clsx from "clsx";
import Tooltip from "@components/commons/Tooltip";
import { CodeBlock } from "react-code-blocks";

export default function ContractCodeBlock({
  fileName,
  code,
  codeBlockHeight,
  length,
  index,
}: {
  fileName: string;
  code: string;
  codeBlockHeight: number;
  length?: number;
  index?: number;
}) {
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [isPermaLinkClicked, setIsPermaLinkClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const firstLoad = useRef(true);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      const path = window.location.hash;
      if (path && path.includes("#")) {
        const id = path.replace("#", "");
        const elementItem = window.document.getElementById(id);
        if (elementItem !== null) {
          const r = elementItem.getBoundingClientRect();
          window.scrollTo({
            top: r.top,
            behavior: "smooth",
          });
        }
      }
    }
  });

  return (
    <div
      data-testid={`${fileName}-code-row`}
      id={fileName}
      className={clsx(
        "flex flex-col md:gap-y-[23px] gap-y-[21px]",
        index === 1 ? "mt-[47.5px] mb-[53px]" : "my-[53px]",
      )}
    >
      <div className="flex flex-row md:items-center">
        <div className="flex grow tracking-[0.01em]">
          <div
            data-testid={`${fileName}-code-title`}
            className="md:w-auto w-[87px] text-white-700"
          >
            {length && index
              ? `File ${index} of ${length}: ${fileName}`
              : fileName}
          </div>
        </div>
        <div className="flex flex-row md:gap-x-6 gap-x-4">
          <Tooltip title="Copy" text="Code Copied!" active={isCodeCopied}>
            <FiCopy
              size={18}
              role="button"
              data-testid="contract-code-copy-icon"
              onClick={() => onCopyCodeIconClick(setIsCodeCopied, code)}
              className="text-white-50"
            />
          </Tooltip>
          <Tooltip title="Copy" text="Link Copied!" active={isPermaLinkClicked}>
            <FiShare2
              size={18}
              role="button"
              data-testid="contract-code-share-icon"
              onClick={() => onPermaLinkClick(setIsPermaLinkClicked, fileName)}
              className="text-white-50"
            />
          </Tooltip>
          {isCodeExpanded ? (
            <FiMinimize
              size={18}
              role="button"
              data-testid="contract-code-maximize-icon"
              onClick={() =>
                onExpandCodeIconClick(setIsCodeExpanded, isCodeExpanded)
              }
              className="text-white-50"
            />
          ) : (
            <FiMaximize
              size={18}
              role="button"
              data-testid="contract-code-maximize-icon"
              onClick={() =>
                onExpandCodeIconClick(setIsCodeExpanded, isCodeExpanded)
              }
              className="text-white-50"
            />
          )}
        </div>
      </div>
      <GradientCardContainer>
        <div
          data-testid={`${fileName}-code-block`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={clsx(
            "px-[19px] py-4",
            isCodeExpanded ? "h-full" : `h-[${codeBlockHeight}px] over`,
          )}
        >
          <CodeBlock
            text={code}
            codeBlock
            showLineNumbers={false}
            customStyle={{
              color: "#FFFFFF",
              fontFamily: "Space Mono",
              fontSize: "12px",
              letterSpacing: "-0.04em",
              height: "100%",
              overflowY: isHovering ? "auto" : "hidden",
              overflowX: "hidden",
              wordBreak: "break-word",
              background: `linearGradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), linearGradient(152.58deg, rgba(51, 51, 51, 0.4) -3.08%, rgba(128, 128, 128, 0.1) 77.78%)`,
              whiteSpace: "pre-wrap",
              display: "flex",
            }}
          />
        </div>
      </GradientCardContainer>
    </div>
  );
}

const onCopyCodeIconClick = async (
  onCopyClick: Dispatch<SetStateAction<boolean>>,
  address: string,
) => {
  onCopyClick(true);
  navigator.clipboard.writeText(address);
  await sleep(2000);
  onCopyClick(false);
};

const onExpandCodeIconClick = (
  onExpandClick: Dispatch<SetStateAction<boolean>>,
  isCodeExpanded: boolean,
) => {
  onExpandClick(!isCodeExpanded);
};

const onPermaLinkClick = async (
  setIsPermaLinkClick: Dispatch<SetStateAction<boolean>>,
  componentId: string,
) => {
  setIsPermaLinkClick(true);
  let copyLink = window.location.href;
  if (copyLink.includes("#")) {
    copyLink = copyLink.substring(0, copyLink.indexOf("#"));
  }
  navigator.clipboard.writeText(`${copyLink}#${componentId}`);
  await sleep(2000);
  setIsPermaLinkClick(false);
};
