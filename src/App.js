import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./components/Services/Api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMore from "./components/Button/Button";
import ModalWindow from "./components/Modal/Modal";
import "./App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState({});

  useEffect(() => {
    if (searchQuery !== "") {
      setIsLoading(true);
    }
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
  }, [searchQuery]);

  const fetchImages = () => {
    setIsLoading(true);

    api
      .fetchImages(searchQuery, page)
      .then(
        ({ hits }) => setData((prevImage) => [...prevImage, ...hits]),
        setPage((prevPage) => prevPage + 1)
      )

      .catch((error) => setError(error))

      .finally(() => setIsLoading(false));
  };
  const handleFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setData([]);
    setPage(1);
  };

  const toggleModal = (largeImageURL) => {
    setShowModal((showModal) => !showModal);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className="App">
      {error && <p>Sorry. Something is wrong ¯\_(ツ)_/¯</p>}
      <div>
        {isLoading && (
          <Loader
            type="ThreeDots"
            color=" #3f51b5"
            height={100}
            width={100}
            timeout={4000}
          />
        )}
      </div>
      <Searchbar onSubmit={handleFormSubmit} />

      {
        <div>
          <ImageGallery data={data} onOpenModal={toggleModal} />
          {data.length > 0 && <LoadMore onLoadMore={fetchImages} />}
          {data.length < 1 && <p>Please enter what you want to see </p>}
        </div>
      }
      {showModal && (
        <ModalWindow onClose={toggleModal}>
          <img src={largeImageURL} alt="" width={400} />
        </ModalWindow>
      )}
    </div>
  );
}
