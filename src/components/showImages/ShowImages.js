// import Image from './Image';
import './showImagesStyles.css';

const Image = ({ image }) => {
  return (
    <div>
      <img className="showImage" alt="" src={image} />
    </div>
  );
};

// export default Image;
const ShowImage = ({ images, uploadStatus }) => {
  const show = (image) => {
    return <Image image={image} />;
  };

  return (
    <div className="show">
      {images.length > 0 ? (
        images.map(show)
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
      {uploadStatus === 'success' && <p>Images uploaded successfully!</p>}
      {uploadStatus === 'error' && <p>Error uploading images!</p>}
    </div>
  );
};

export default ShowImage;

// //   const selected_images = selectedImages?.map((file) => (
// //     <div>
// //       <img src={file.preview} style={{ width: "200px" }} alt="" />
// //     </div>
// //   ));
