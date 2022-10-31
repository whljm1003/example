import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import { css } from "@emotion/react";

type Props = {
  placeholder?: string;
  option?: string[];
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
};

const tempData: string[] = ["가", "나", "다", "라", "마"];

const Select = (props: Props) => {
  const [placeholder, setPlaceholder] = useState("");
  const [option, setOption] = useState([]);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onClickValue = () => {
    setIsOpen((prev) => !prev);
  };
  const onClickOption = (e: string) => {
    setValue(e);
    setIsOpen((prev) => !prev);
  };
  return (
    <Wrapper>
      <SelectBox>
        <Input
          isOpen={isOpen}
          readOnly
          placeholder={placeholder}
          value={value}
          onClick={onClickValue}
        />
        {isOpen && (
          <Ul>
            {tempData.map((e, i) => (
              <Li key={i} onClick={() => onClickOption(e)}>
                {e}
              </Li>
            ))}
          </Ul>
        )}
      </SelectBox>
    </Wrapper>
  );
};

export default Select;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SelectBox = styled.div`
  width: 200px;

  position: relative;
`;
const Input = styled.input<{ isOpen: boolean }>`
  width: 100%;
  line-height: 50px;
  padding-left: 10px;
  outline: none;
  border-radius: 12px;
  border: 1px solid gray;
  cursor: pointer;
  ${({ isOpen }) =>
    isOpen &&
    css`
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;
const Ul = styled.ul`
  width: 100%;
  padding-left: 0;
  margin: 0;
  list-style: none;
  position: absolute;
  left: 0;
  top: 54px;
`;
const Li = styled.li`
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
`;
