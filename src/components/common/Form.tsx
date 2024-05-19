import { Wrapper } from './CommonStyles';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Form = ({ children }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return <Wrapper onSubmit={(e) => handleSubmit(e)}>{children}</Wrapper>;
};

export default Form;
