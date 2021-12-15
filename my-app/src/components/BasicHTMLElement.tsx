/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { CSSProperties } from 'react';
import { Card } from 'antd';

const BasementCSS: CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  boxSizing: 'border-box'
};

const LayerCSS: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const BoardCSS: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  color: 'white',
};

export const Basement = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: CSSProperties;
  className?: string;
  hidden?: boolean;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...BasementCSS, ...props.style }}
      className={props.className}
      hidden={props.hidden ?? false}
    >
      {props.children}
    </div>
  );
}; // 默认100%大小container

export const Layer = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: CSSProperties;
  className?: string;
  hidden?: boolean;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...LayerCSS, ...props.style }}
      className={props.className}
      hidden={props.hidden ?? false}
    >
      {props.children}
    </div>
  );
}; // z轴分层

export const Board = (props: {
  children: React.ReactNode;
  onClick?: Function;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div
      onClick={() => {
        props.onClick;
      }}
      style={{ ...BoardCSS, ...props.style }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}; // 默认白色蒙板

export const Container = (props: {
  children: React.ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  onClick?: Function;
  hoverable?: boolean;
  className?: string;
}) => {
  return (
    <Card
      onClick={() => {
        if (props.onClick !== undefined) props.onClick();
      }}
      style={{
        borderRadius: '10px',
        ...(props.style ?? {}),
      }}
      bodyStyle={{ padding: '15px 25px', ...(props.bodyStyle ?? {}) }}
      hoverable={props.hoverable ?? true}
      className={ props.className ?? "shadow-xl"}
      bordered={false}
    >
      {props.children}
    </Card>
  );
};

export const EInput = (props: {
  style?: CSSProperties;
  onChange?: Function;
  hoverable?: boolean
  value?: string;
  className?: string;
}) => {
  const { style, onChange, hoverable, value } = props;
  const hoverTransform = "transition duration-300 linear transform hover:scale-110 ";
  
  return <input
    className={"shadow-md border-b-2 outline-none text-black cursor-auto " + hoverable ? hoverTransform : ' ' + props.className}
    style={{ height: 32, lineHeight: 32, ...style }}
    value={value}
    onChange={() => { onChange === undefined ? null : onChange()}}
  />
}
