import { ErrorDiv } from './CommonStyles';

type Props = {
  error: string;
};

const CommentsDiv = ({ error }: Props) => {
  return <ErrorDiv>{error}</ErrorDiv>;
};

export default CommentsDiv;
