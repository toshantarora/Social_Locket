/* eslint-disable react/no-unescaped-entities */
import PostWebImage from "../../assets/images/post-image.webp";
import PostImage from "../../assets/images/post-image.png";

const Inventory = () => {
  return (
    <main id="layoutSidenav_content">
      <div>
        <ul className="breadcrumb">
          <li>
            <a href="dashboard.html">Dashboard</a>
          </li>
          <li>
            <a href="setting.html"> Setting</a>
          </li>
          <li>
            <a href="/inventory" className="active">
              {" "}
              Inventory
            </a>
          </li>
        </ul>
      </div>
      <div className="inventory">
        <div className="inventory-sidebar">
          <ul>
            <li className="active">
              <a href="/">
                <div className="inventory-collection">
                  <figure>
                    <picture>
                      <source srcSet={PostWebImage} type="image/webp" />
                      <source srcSet={PostImage} type="image/png" />
                      <img
                        loading="lazy"
                        src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        data-src="assets/images/post-image.png"
                        alt="user-img"
                        className=""
                        width={70}
                        height={70}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <h6>
                      Handpicked, talented Writers Stop sifting through the
                      endless stream...{" "}
                    </h6>
                    <p>
                      Handpicked, talented Writers Stop sifting through the
                      endless stream of freelancers.
                    </p>
                  </figcaption>
                </div>
                <div className="inventory-bottom">
                  <div className="inventory-likes">
                    <div className="like-count">
                      <i className="fa-solid fa-thumbs-up" />
                      <span>230K</span>
                    </div>
                    <div className="commnet-count">
                      <i className="fa fa-message" />
                      <span>100k</span>
                    </div>
                  </div>
                  <div className="inventory-price">
                    <div>$ 20</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="/">
                <div className="inventory-collection">
                  <figure>
                    <picture>
                      <source srcSet={PostWebImage} type="image/webp" />
                      <source srcSet={PostImage} type="image/png" />
                      <img
                        loading="lazy"
                        src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        data-src="assets/images/post-image.png"
                        alt="user-img"
                        className=""
                        width={70}
                        height={70}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <h6>
                      Handpicked, talented Writers Stop sifting through the
                      endless stream...{" "}
                    </h6>
                    <p>
                      Handpicked, talented Writers Stop sifting through the
                      endless stream of freelancers.
                    </p>
                  </figcaption>
                </div>
                <div className="inventory-bottom">
                  <div className="inventory-likes">
                    <div className="like-count">
                      <i className="fa-solid fa-thumbs-up" />
                      <span>230K</span>
                    </div>
                    <div className="commnet-count">
                      <i className="fa fa-message" />
                      <span>100k</span>
                    </div>
                  </div>
                  <div className="inventory-price">
                    <div>$ 20</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="/">
                <div className="inventory-collection">
                  <figure>
                    <picture>
                      <source srcSet={PostWebImage} type="image/webp" />
                      <source srcSet={PostImage} type="image/png" />
                      <img
                        loading="lazy"
                        src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        data-src={PostImage}
                        alt="user-img"
                        className=""
                        width={70}
                        height={70}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <h6>
                      Handpicked, talented Writers Stop sifting through the
                      endless stream...{" "}
                    </h6>
                    <p>
                      Handpicked, talented Writers Stop sifting through the
                      endless stream of freelancers.
                    </p>
                  </figcaption>
                </div>
                <div className="inventory-bottom">
                  <div className="inventory-likes">
                    <div className="like-count">
                      <i className="fa-solid fa-thumbs-up" />
                      <span>230K</span>
                    </div>
                    <div className="commnet-count">
                      <i className="fa fa-message" />
                      <span>100k</span>
                    </div>
                  </div>
                  <div className="inventory-price">
                    <div>$ 20</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="inventory-right">
          <div className="box-shadow">
            <div className="user-post">
              <a href="/" className="post-profile">
                <figure>
                  <span>RJ</span>
                  <picture>
                    <source
                      srcSet="../../assets/images/user-img.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="../../assets/images/user-img.png"
                      type="image/png"
                    />
                    <img
                      loading="lazy"
                      src="assets/images/user-img.png"
                      data-src="../../assets/images/user-img.png"
                      alt="user-img"
                      className="img-fluid"
                      width={50}
                      height={50}
                    />
                  </picture>
                </figure>
                <figcaption>
                  <h5 className="mb-0">Robin Jennie</h5>
                  <span>Nov 08 at 09:59 PM</span>
                </figcaption>
              </a>
              <div className="inventory-price">
                <div>$ 20</div>
              </div>
            </div>
            <div className="mt-3">
              <h5>
                Handpicked, talented Writers Stop sifting through the endless
                stream of freelancers.
              </h5>
            </div>
            <img
              loading="lazy"
              src={PostImage}
              data-src={PostImage}
              alt="post"
              className="img-fluid"
              width=""
              height=""
            />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div className="comment-section">
              <div className="comment-posted">
                <figure>
                  <span>DR</span>
                  <picture>
                    <source
                      srcSet="assets/images/user-img.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="assets/images/user-img.png"
                      type="image/png"
                    />
                    <img
                      loading="lazy"
                      src="assets/images/user-img.png"
                      data-src="assets/images/user-img.png"
                      alt="user-img"
                      className="img-fluid"
                      width={55}
                      height={55}
                    />
                  </picture>
                </figure>
                <figcaption>
                  <h6>
                    <strong>Dorenshie Ree</strong>
                  </h6>
                  <p>
                    Create a blog brief using our hassle-free, guided flow. Get
                    a preliminary quote and estimated delivery...
                    <a href="/">See More</a>
                  </p>
                </figcaption>
              </div>
              <div className="share-comment">
                <figure>
                  <span />
                  <picture>
                    <source
                      srcSet="assets/images/user-img.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="assets/images/user-img.png"
                      type="image/png"
                    />
                    <img
                      loading="lazy"
                      src="assets/images/user-img.png"
                      data-src="assets/images/user-img.png"
                      alt="user-img"
                      className="img-fluid"
                      width={50}
                      height={50}
                    />
                  </picture>
                </figure>
                <span>
                  <input
                    type="text"
                    name=""
                    placeholder="Write your comment...."
                  />
                  <button type="button">
                    <img
                      src="assets/images/share-icon.png"
                      alt="share"
                      width={24}
                      height={24}
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Inventory;
