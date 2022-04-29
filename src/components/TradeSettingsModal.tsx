import React, { ReactNode, CSSProperties } from 'react';
import styled from 'styled-components';

type Props = {
  heading?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  date?: string;
  info?: string;
  color?: string;
};

function TradeSettingsModal({ className }: Props) {
  return (
    <div className="container">
      <span>
        <h1>Trade Settings</h1> <button>Confirm</button>
      </span>
      <form>
        <label>First Buy in amount</label>
        <input type="submit" value="Submit" />
      </form>
      <button className="strategy">↻ Get a Suggested Strategy</button>
    </div>
  );
}

export default TradeSettingsModal;
