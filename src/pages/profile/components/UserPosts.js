/* eslint-disable jsx-a11y/img-redundant-alt */

import { Link } from 'react-router-dom';
import { parseStringArray, removeWhitespaces } from '../../../helpers';

const UserPosts = ({ usersPost }) => {
  // console.log('usersPost', usersPost);
  // const navigate = useNavigate();
  //  const userTitle = props?.post?.title? props?.post?.title : "";
  //  const titleLink = postId.concat("_", userTitle);
  // const onImageClick = (postId, title) => {
  //   console.log(postId, title);
  //   const id = postId.toString();
  //   const userTitle= title;
  //    const titleLink = id.concat("_", userTitle);
  //     navigate(`/postDetails/${removeWhitespaces(titleLink)}`);
  // }
  return (
    <div className="post-grid">
      
      <ul className="box-container three-cols">
        {
          usersPost !== null ? (
          usersPost?.map((item, idx) => item?.images !== null ?
          parseStringArray(item?.images)?.map((imag) => (

            <li key={idx} className="box show">
              <div className="inner">
                <Link
                to = {
                  `/postDetails/${removeWhitespaces(item?.id?.toString()?.concat("_", item?.title))}`
                }
                // onClick={() => onImageClick(item?.id, item?.title)}
                  className="glightbox"
                >
                  <img src={imag} alt="isdage" width="" height="" />
                </Link>
                <p>{ item?.title ?  item?.title : ""}</p>
              </div>
            </li>
          ))
           : <p> No Posts </p>
          )  
        ) : (
          <p>No Posts</p>
        )}
      </ul>
    </div>
  );
};

export default UserPosts;
