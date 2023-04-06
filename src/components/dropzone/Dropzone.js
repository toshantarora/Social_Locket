// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// const Dropzone = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   //   const onDrop = useCallback((acceptedFiles) => {
//   //     // Do something with the files
//   //     setSelectedImages(
//   //       acceptedFiles.map((file) =>
//   //         Object.assign(file, {
//   //           preview: URL.createObjectURL(file),
//   //         }),
//   //       ),
//   //     );
//   //   }, []);
//   const onDrop = useCallback((acceptedFiles) => {
//     acceptedFiles.map((file, index) => {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         setSelectedImages((prevState) => [
//           ...prevState,
//           { id: index, src: e.target.result },
//         ]);
//       };
//       reader.readAsDataURL(file);
//       return file;
//     });
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
// //   const selected_images = selectedImages?.map((file) => (
// //     <div>
// //       <img src={file.preview} style={{ width: "200px" }} alt="" />
// //     </div>
// //   ));
//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// };

// export default Dropzone;

import { useDropzone } from 'react-dropzone';

import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-width: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
  border: 2px dashed var(--border-color);
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  border-radius: 0.25rem;
`;

const Dropzone = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    // acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  //   const lists = acceptedFiles.map((list) => (
  //     <li key={list.path}>
  //       {list.path} - {list.size} bytes
  //     </li>
  //   ));

  return (
    <>
      {' '}
      <section className="dropbox">
        <Container
          className="dropbox"
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
        >
          <input {...getInputProps()} />
          <p>Drag &#39;n&#39; drop some files here</p>
          <button type="button" className="btn" onClick={open}>
            Click to select file
          </button>
        </Container>
      </section>
      {/* <aside>
        <h4>List</h4>
        <p>{lists}</p>
      </aside> */}
    </>
  );
};

export default Dropzone;
