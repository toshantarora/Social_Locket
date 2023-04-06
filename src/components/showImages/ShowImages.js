// import Image from './Image';
import './showImagesStyles.css';

const Image = ({ image }) => {
  return (
    <div>
      <img className="showImage" alt="" src={image.preview} />
    </div>
  );
};

// export default Image;
const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} />;
  };

  return <div className="show">{images.map(show)}</div>;
};

export default ShowImage;

// //   const selected_images = selectedImages?.map((file) => (
// //     <div>
// //       <img src={file.preview} style={{ width: "200px" }} alt="" />
// //     </div>
// //   ));
