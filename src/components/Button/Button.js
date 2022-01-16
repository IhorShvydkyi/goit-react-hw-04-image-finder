import { ButtonLoadMore } from "./Button.styled";

function Button({ onLoadMore }) {
  return (
    <ButtonLoadMore type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoadMore>
  );
}
export default Button;
