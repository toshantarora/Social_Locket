/* eslint-disable jsx-a11y/img-redundant-alt */

import { parseStringArray } from '../../../helpers';

const UserPosts = ({ usersPost }) => {
  console.log('usersPost', usersPost);
  return (
    <div className="post-grid">
      <ul className="box-container three-cols">
        {usersPost.length > 0 ? (
          usersPost.map((item, idx) => parseStringArray(item.images).map((imag) => (
            <li key={idx} className="box show">
              <div className="inner">
                <a
                  href="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                  className="glightbox"
                >
                  <img src={imag} alt="isdage" width="" height="" />
                </a>
              </div>
            </li>
          )))
        ) : (
          <p>No Posts</p>
        )}
      </ul>
    </div>
  );
};

export default UserPosts;
