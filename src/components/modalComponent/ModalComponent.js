import Modal from 'react-bootstrap/Modal';

const ModalComponent = (props) => {
  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      size={props?.size ? props?.size : 'xl'}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title" id="exampleModalLabel">
          {/* Complete Profile */}
          {props?.heading}
        </h5>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
