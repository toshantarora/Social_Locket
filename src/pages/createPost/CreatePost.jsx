import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCallback, useContext, useState } from "react";
import parse from "html-react-parser";
import { Form, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { getUserFullName, getUserProfileImage } from "../../utils/Storage";
import { getInitials, isNonEmptyString } from "../../helpers";
import Dropzone from "../../components/dropzone/Dropzone";
import ShowImage from "../../components/showImages/ShowImages";
import TagInputField from "../../components/tagInputField/TagInputField";
import { API } from "../../services/ApiClient";
import { AuthContext } from "../../context/authContext";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const userProfilePic = getUserProfileImage();
  const userFullName = getUserFullName();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [tags, setTags] = useState([]);
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    setSelectedImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);
  const handleChange = (event) => {
    setSelectValue({ selectValue: event.target.value });
  };

  const { mutate: savePost, isLoading: isPostLoading } = useMutation(
    async (payload) => {
      const res = await API.post("/posts", payload);
      console.log(res);
      if (res) {
        return res;
      }

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
        if (data?.success) {
          queryClient.invalidateQueries(["posts"]);
        }
      },
    },
  );

  const handleClick = async (e) => {
    e.preventDefault();

    savePost({
      name: title,
      description: text,
      type: selectValue,
      keywords: tags,
      user_id: auth?.userId,
      profile_image: selectedImages,
      pages,
      price,
    });
  };

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
                  <span>{userFullName ? getInitials(userFullName) : ""}</span>
                )}
              </figure>
              <figcaption>
                <h5 className="mb-0">{userFullName}</h5>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected="">Anyone</option>
                  <option value={1}>Connections only</option>
                </select>
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
                  value={state?.title ? state?.title : title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CKEditor
                  id="full-featured-non-premium"
                  editor={ClassicEditor}
                  data={text}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
                <p>{parse(text)}</p>
              </div>
              <div className="mb-3">
                <output id="result" />
              </div>
              <div className="mb-3">
                <Dropzone onDrop={onDrop} />
                <ShowImage images={selectedImages} />
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
                  type="number"
                  className="form-control"
                  placeholder="Pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                />
              </div>

              <div>
                <TagInputField setTags={setTags} tags={tags} />
              </div>
              <Form.Select
                onChange={handleChange}
                className="mb-3"
                aria-label="Default select example"
              >
                <option>Select type</option>
                <option value="blog">Blog</option>
                <option value="article">Article</option>
              </Form.Select>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                <Form.Control
                  placeholder="Price"
                  aria-label="Price"
                  aria-describedby="basic-addon1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
              <div className="mb-3 text-end">
                <button
                  type="button"
                  onClick={handleClick}
                  className="btn btn-common"
                  disabled={isPostLoading}
                >
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
