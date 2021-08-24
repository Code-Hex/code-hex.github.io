// Thanks! https://github.com/syumai/react-sidebar-layout
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
  PointerEventHandler,
  PointerEvent,
  SetStateAction,
} from 'react';

/***
 * Resizer Component
 */

type ResizerStyleProps = {
  transitionDuration?: number; // milli seconds
  width?: number;
};

type ResizerDivProps = {
  left?: number;
  right?: number;
  width: number; // must not be optional as dynamic style
} & ResizerStyleProps;

type ResizerProps = ResizerStyleProps & {
  position: string;
  xPos: number;
  setWidth: (width: SetStateAction<number>) => void;
};

const useResizeStyle = ({
  width,
  left,
  right,
  transitionDuration = 300,
}: ResizerDivProps): CSSProperties => {
  const style: CSSProperties = useMemo(
    () => ({
      width: `${width}px`,
      left: typeof left === 'number' ? `${left}px` : 'initial',
      right: typeof right === 'number' ? `${right}px` : 'initial',
      transition: `background-color ${transitionDuration}ms`,
    }),
    [width, left, right, transitionDuration]
  );
  return style;
};

export const Resizer = ({
  transitionDuration,
  width = 6,
  position,
  xPos,
  setWidth,
}: ResizerProps): JSX.Element => {
  const [dragging, setDragging] = useState(false);

  const resizeStyle = useResizeStyle({
    width,
    left: position === 'left' ? xPos - width / 2 : undefined,
    right: position === 'right' ? xPos - width / 2 : undefined,
    transitionDuration,
  });

  const mouseDownHandler = useCallback((e: PointerEvent) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const mouseUpHandler = useCallback((e: PointerEvent) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const mouseMoveHandler = useCallback(
    (e: PointerEvent) => {
      if (!dragging) {
        return;
      }
      setWidth((prev) => prev + e.movementX);
    },
    [dragging, setWidth]
  );

  return (
    <div
      onPointerDown={mouseDownHandler}
      onPointerUp={mouseUpHandler}
      onPointerMove={mouseMoveHandler}
      className="select-none cursor-col-resize absolute z-20 h-full hover:bg-blue-400"
      style={resizeStyle}
    />
  );
};

/***
 * Layout components
 */

export interface SidebarLayoutProps {
  resizerWidth?: number;
  defaultSidebarWidth?: number;
  gridCols?: number;
  children: ReactNode;
}

interface LayoutDivProps {
  sidebarWidth: number;
  className: string;
  children: ReactNode;
}

const LayoutDiv = ({
  sidebarWidth,
  className,
  children,
}: LayoutDivProps): JSX.Element => {
  const style: CSSProperties = useMemo(
    () => ({
      gridTemplateColumns: `${sidebarWidth}px 1fr`,
    }),
    [sidebarWidth]
  );
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export const SidebarLayout = ({
  resizerWidth = 4,
  defaultSidebarWidth = 200,
  gridCols = 2,
  children,
}: SidebarLayoutProps): JSX.Element => {
  const [sidebarWidth, setSidebarWidth] = useState(defaultSidebarWidth);
  return (
    <LayoutDiv
      className={`grid grid-cols-${gridCols}`}
      sidebarWidth={sidebarWidth}
    >
      <Resizer
        width={resizerWidth}
        position="left"
        xPos={sidebarWidth}
        setWidth={setSidebarWidth}
      />
      {children}
    </LayoutDiv>
  );
};
