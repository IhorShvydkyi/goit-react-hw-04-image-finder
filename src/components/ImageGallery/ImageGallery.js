import {
  GalleryList,
  GalleriItem,
  GalleriItemImg,
} from "./ImageGallery.styled";

export default function ImageGallery({ data, onOpenModal }) {
  return (
    <GalleryList>
      {data.map((image) => (
        <GalleriItem
          onClick={() => {
            onOpenModal(image);
          }}
          key={image.id}
        >
          <GalleriItemImg src={image.webformatURL} alt={image.tags} />
        </GalleriItem>
      ))}
    </GalleryList>
  );
}
