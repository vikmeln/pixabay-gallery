import { useEffect, useState } from "react";
import "./App.css";

type Image = {
  id: number;
  previewURL: string;
  largeImageURL: string;
  user: string;
  likes: number;
};

type PixabayResponse = {
  hits: Image[];
};

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://pixabay.com/api/?key=54971398-b809467565d85b675f4f71b18&q=nature&image_type=photo",
      );
      const data: PixabayResponse = await res.json();
      setImages(data.hits);
    };
    fetchData();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="gallery">
      <div className="image-container">
        <button className="arrow left" onClick={prevImage}>
          ←
        </button>
        <img
          src={images[currentIndex]?.largeImageURL}
          className="main-image"
        ></img>
        <button className="arrow right" onClick={nextImage}>
          →
        </button>
      </div>
      <div className="info">
        <span>Author: {images[currentIndex]?.user}</span>
        <span>Likes: {images[currentIndex]?.likes}</span>
      </div>
      <div className="preview">
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.previewURL}
            onClick={() => setCurrentIndex(index)}
            className={index === currentIndex ? "active" : ""}
          ></img>
        ))}
      </div>
    </div>
  );
}

export default App;
