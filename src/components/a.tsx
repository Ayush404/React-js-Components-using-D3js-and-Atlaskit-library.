import * as React from "react";
import styled from "styled-components";
import { borderRadius, colors } from "@atlaskit/theme";
import Badge from "@atlaskit/badge";


const Lozenge = require('@atlaskit/lozenge');

const APPEARANCES = [{ label: "High", value: "removed" }];

interface ItemProps {
  inverted?: boolean;
}

const Item = styled.div`
  align-items: center;
  background: ${(props: ItemProps) => (props.inverted ? colors.B400 : "none")};
  border-radius: ${borderRadius}px;
  color: ${(props: ItemProps) => (props.inverted ? colors.N0 : "inherit")};
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  max-width: 450px;
  padding: 0.6em 1em;

  &:hover {
    background-color: ${(props: ItemProps) =>
      props.inverted ? colors.B500 : colors.N20};
  }
`;

function Example() {
  return (
    <div id="ex">
      <Item>
        <p>
          <b>Premium marketing less than 0</b>
        </p>

        {APPEARANCES.map(a => (
          <p key={a.value}>
            <Lozenge appearance={a.value} isBold>
              {a.label}
            </Lozenge>
          </p>
        ))}

        <Badge appearance="added" max={99}>
          {3000}
        </Badge>
      </Item>
    </div>
  );
}

export default Example;
