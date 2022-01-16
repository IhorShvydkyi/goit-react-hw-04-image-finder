import { Component } from "react";
import {
  SearchbarStyled,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

export default class Searchbar extends Component {
  state = { searchInfo: "" };

  handleNameChange = (e) => {
    this.setState({ searchInfo: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchInfo.trim() === "") {
      return alert("Enter your request");
    }
    this.props.onSubmit(this.state.searchInfo);
    this.setState({ searchInfo: "" });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchInfo}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}
