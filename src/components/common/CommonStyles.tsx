import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  font-size: 18px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
`;
export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  background-color: #f7f9ff;
  width: 100%;
  overflow-x: auto;
  padding: 20px;
  font-size: 20px;
`;
export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;

  & button {
    margin-top: 30px;
    width: 95px;
  }

  & fieldset {
    width: 100%;
    margin: 15px 0 15px;
  }
`;

export const NavButton = styled(Link)`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  text-align: center;
  margin-left: 20px;
  text-decoration: none;
  font-size: 18px;
  white-space: nowrap;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const SwitchButton = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 3px 3px;
  font-size: 10px;
  margin: 10px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }
  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;
export const ErrorDiv = styled.div`
  color: red;
  min-height: 20px;
  display: flex;
  text-align: center;
`;

export const InputElement = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 85px;
  padding: 20px 40px;
  background-color: #d8e1ff;
`;

export const HeaderButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  max-width: 350px;
  min-width: 250px;
  width: 100%;
`;
export const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 40px;
  background-color: #d8e1ff;
  height: 65px;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  color: #974160;
  font-size: 13px;

  &:hover {
    color: #69ddff;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;

  & button {
    margin-top: 30px;
    width: 95px;
  }

  & fieldset {
    width: 100%;
    margin: 15px 0 15px;
  }
`;
export const InputElem = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;

export const ButtonSubmit = styled.button`
  background-color: #ada5f9;
  border-radius: 3px;
  border: 1px solid #ada5f9;
  color: #511f31;
  cursor: pointer;
  padding: 10px 10px;
  font-size: 18px;

  &:hover,
  :focus {
    background-color: #f7f9ff;
    color: #2c5777;
  }

  &:disabled {
    background-color: #c0c0c0;
    color: black;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #f7f9ff;
  width: 100%;

  padding: 20px;
  font-size: 20px;
`;

export const ErrorsText = styled.p`
  color: red;
  font-size: 13px;
`;

export const ErrorMessage = styled.div`
  margin: auto;
  font-size: 25px;
`;
export const DefaultCheckboxLabel = styled.label`
  font-size: 13px;
  display: flex;
  gap: 7px;
`;

export const SelectElem = styled.select`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;

  &:focus {
    outline: none;
    border: 2px solid #39739d;
  }
`;
export const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const FieldName = styled.span`
  font-size: 20px;
  color: #39739d;
`;
