import { Component } from "react";
// import Loader from 'react-loader-spinner'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./components/Services/Api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMore from "./components/Button/Button";
import ModalWindow from "./components/Modal/Modal";
import "./App.css";

export default class App extends Component {
  state = {
    searchInfo: "",
    data: [],
    status: "idle",
    page: 1,
    error: null,
    showModal: false,
    currImg: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchInfo } = this.state;

    if (prevState.searchInfo !== searchInfo) {
      this.setState({ status: "pending", page: 1 });
      api
        .fetchImages(searchInfo, page)
        .then((data) => data.hits)
        .then((images) => {
          this.setState({ data: images, status: "resolved" });
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }

    if (prevState.page !== page) {
      this.setState({ status: "pending" });

      api
        .fetchImages(searchInfo, page)
        .then((data) => data.hits)
        .then((images) =>
          this.setState((prevState) => ({
            data: [...prevState.data, ...images],
            status: "resolved",
          }))
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleFormSubmit = (searchInfo) => {
    this.setState({ searchInfo });
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  toggleModal = (image) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currImg: image,
    }));
  };

  render() {
    const { status, data, currImg } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === "idle" && <div>Enter your request</div>}

        {status === "pending" && (
          <div>
            {/* <Loader
							type="ThreeDots"
							color=" #3f51b5"
							height={100}
							width={100}
							timeout={4000} 
						/> */}
            Loading...
          </div>
        )}

        {status === "resolved" && (
          <div>
            <ImageGallery data={data} onOpenModal={this.toggleModal} />
            {data.length > 0 && <LoadMore onLoadMore={this.onLoadMore} />}
          </div>
        )}

        {status === "rejected" && <div> Something went wrong</div>}
        {this.state.showModal && (
          <ModalWindow onClose={this.toggleModal}>
            <img src={currImg.largeImageURL} alt={currImg.tags} />
          </ModalWindow>
        )}
      </div>
    );
  }
}
