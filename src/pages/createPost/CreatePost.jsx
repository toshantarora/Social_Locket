/* eslint-disable no-unused-vars */
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCallback, useContext, useEffect, useState } from "react";
// import parse from "html-react-parser";
import { Form, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { postsService } from "../../services/ImageUploadApi";
import { getUserFullName, getUserProfileImage } from "../../utils/Storage";
import { getInitials, isNonEmptyString } from "../../helpers";
import Dropzone from "../../components/dropzone/Dropzone";
import ShowImage from "../../components/showImages/ShowImages";
import TagInputField from "../../components/tagInputField/TagInputField";
import { API } from "../../services/ApiClient";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = 'social_locket';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dzs0eyrnl/image/upload';
const schema = yup.object().shape({
  title: yup.string().required(),
  type: yup.string().nullable().required("Please select type"),
  pages: yup.string().required(),
});
const CreatePost = () => {
  //   const [text] = useState("");
  // const [selectedImages, setSelectedImages] = useState([]);
   const [images, setImages] = useState([]);
   const [uploadStatus, setUploadStatus] = useState('idle');
  const userProfilePic = getUserProfileImage();
  const userFullName = getUserFullName();
  const { state } = useLocation();
  const [tags, setTags] = useState([]);
  const preloadedValues = {
    title: state?.title,
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    register("description");
  });

   const uploadToCloudinary = async (file) => {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
     formData.append('folder', 'my_folder');

     try {
       const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
       return response.data.secure_url;
     } catch (error) {
       console.log('Error uploading to Cloudinary: ', error);
       throw new Error('Error uploading to Cloudinary');
     }
   };
  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files

  //   setSelectedImages(
  //     acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       }),
  //     ),
  //   );
  // }, []);

  const { mutateAsync, isLoading } = useMutation(uploadToCloudinary);
  const onDrop = async (acceptedFiles) => {
      setUploadStatus('uploading');

      try {
        const uploadedImages = await Promise.all(
          acceptedFiles.map((file) => mutateAsync(file))
        );
        setImages([...images, ...uploadedImages]);
        setUploadStatus('success');
      } catch (error) {
        console.log('Error uploading images: ', error);
        setUploadStatus('error');
      }
    };


  //   const onDrop = useCallback((acceptedFiles) => {
  //     acceptedFiles.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setSelectedImages((prevState) => [...prevState, reader.result]);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }, []);



  const { mutate: savePost, isLoading: isPostLoading } = useMutation(
    async (payload) => {
      const res = await API.post("/posts", payload);
      console.log(res);
      //   if (res) {
      //     return res;
      //   }

      if (isNonEmptyString(res?.data?.message)) {
        Swal.fire({
          title: "Success",
          text: res?.data?.message,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
      return null;
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(["posts"]);
        }
      },
    },
  );
  console.log(watch(), tags);
  const onSubmit = async (data) => {
    // e.preventDefault();
    const tagsString = `['${tags.join("','")}']`;
    savePost({
      title: data?.title,
      description: data.description,
      type: data.type,
      location: data?.location,
      price: data?.price.toString(),
      //   status: "AVAILABLE",
      user_id: auth?.userId.toString(),
      pages: data?.pages.toString(),
      images: images ? JSON.stringify(images) : JSON.stringify([]),
      keywords: JSON.stringify(tagsString),
      //   available: "24/04/2023",
      offer_price: data?.price.toString(),
      purchased_price: '',
      customer_user_id: 2,
    });
  };
  //   {
  //     "title": "Create A new Post",
  //     "description": "Create A new Post description",
  //     "type": "Article",
  //     "location": "511 4th Floor Buddha Marg, mandawali",
  //     "price": "£120.00",
  //     "status": "AVAILABLE",
  //     "user_id": "51",
  //     "pages": "5",
  //     "images": "['https://images.pexels.com/photos/6544374/pexels-photo-6544374.jpeg', 'https://images.pexels.com/photos/357737/pexels-photo-357737.jpeg', 'https://images.pexels.com/photos/1437811/pexels-photo-1437811.jpeg']",
  //     "keywords": "['One', 'two', 'three', 'four' ]",
  //     "available": "26/03/2023",
  //     "offer_price": "£12.50",
  //     "purchased_price": "",
  //     "customer_user_id": 51
  // }
  return (
    <main id="layoutSidenav_content">
      <div className="box-shadow">
        <div className="create-post">
          <h3 className="text-center">Create Post</h3>
          <hr />
          <div className="user-post">
            <div className="post-profile">
              <figure>
                {userProfilePic !== null ? (
                  <picture>
                    <source
                      srcSet="assets/images/user-img.webp"
                      type="image/webp"
                    />
                    <source srcSet={userProfilePic} type="image/png" />
                    <img
                      loading="lazy"
                      src={userProfilePic}
                      data-src={userProfilePic}
                      alt="user-img"
                      className="img-fluid"
                      width={50}
                      height={50}
                    />
                  </picture>
                ) : (
                  <span>{userFullName ? getInitials(userFullName) : ''}</span>
                )}
              </figure>
              <figcaption>
                <h5 className="mb-0">{userFullName}</h5>
                {/* <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected="">Anyone</option>
                  <option value={1}>Connections only</option>
                </select> */}
              </figcaption>
            </div>
          </div>
          <div className="new-post">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Post title"
                  name="title"
                  {...register('title')}
                />
                {errors?.title?.message ? (
                  <div style={{ color: 'red' }}>{errors?.title?.message}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="mb-3">
                <CKEditor
                  id="full-featured-non-premium"
                  editor={ClassicEditor}
                  //   data={text}
                  // onChange={(event, editor) => {
                  //   const data = editor.getData();
                  //   setText(data);
                  // }}
                  //   onChange={(event, editor) => {
                  //     setValue("input", editor.getData());
                  //     trigger("input");
                  //   }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setValue('description', data);
                  }}
                />
                {/* <p>{parse(text)}</p> */}
              </div>
              <div className="mb-3">
                <output id="result" />
              </div>
              <div className="mb-3">
                <Dropzone onDrop={onDrop} />
                <ShowImage images={images} uploadStatus={uploadStatus} />
              </div>
              {/* <div className="mb-3 add-to-post">
                <h6 className="mb-0">Add to your post</h6>
                <ul>
                
                  <li>
                    <button type="button">
                      <i className="fa-solid fa-location-dot" />
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <i className="fa-solid fa-user-tag" />
                    </button>
                  </li>
                </ul>
              </div> */}
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Pages"
                  name="pages"
                  type="number"
                  {...register('pages', {
                    valueAsNumber: true,
                  })}
                />
                {errors?.pages?.message ? (
                  <div style={{ color: 'red' }}>{errors?.pages?.message}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="address"
                  name="location"
                  {...register('location', {
                    required: 'Please enter your address.',
                  })}
                />
                {errors?.location?.message ? (
                  <div style={{ color: 'red' }}>
                    {errors?.location?.message}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div>
                <TagInputField setTags={setTags} tags={tags} />
              </div>

              <div className="mb-3">
                <select
                  type="select"
                  name="type"
                  {...register('type')}
                  className="form-select">
                  <option value="">Select type</option>
                  <option value="blog">Blog</option>
                  <option value="article">Article</option>
                </select>
                {errors.type && (
                  <div style={{ color: 'red' }}> {errors.type.message}</div>
                )}
              </div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  placeholder="Price"
                  aria-label="Price"
                  aria-describedby="basic-addon1"
                  type="number"
                  name="price"
                  {...register('price', {
                    valueAsNumber: true,
                  })}
                />
              </InputGroup>
              <div className="mb-3 text-end">
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-common"
                  disabled={isPostLoading}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatePost;
