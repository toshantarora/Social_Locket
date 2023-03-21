const Setting = () => {
  return (
    <main id="layoutSidenav_content">
      <div className="box-shadow p-0">
        <div className="setting">
          <div className="cover-profile">
            <div
              className="cover-photo"
              style={{
                backgroundImage: 'url("assets/images/cover-photo.jpg")',
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="setting-profile">
              <div className="edit-profile">
                <div className="setting-left">
                  <figure>
                    <span>LC</span>
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
                        src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        data-src="assets/images/user-img.png"
                        alt="user-img"
                        className="img-fluid"
                        width={150}
                        height={150}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <div>
                      <h4 className="mb-0 mt-2 text-center">Lettie Christen</h4>
                      <p className="mb-0 text-center">Content Creater</p>
                    </div>
                    <div className="setting-post">
                      <a href="/" className="">
                        <span>Posts</span>
                        <strong>121</strong>
                      </a>
                      <a href="/" className="">
                        <span>Followers</span>
                        <strong>123</strong>
                      </a>
                      <a href="/" className="">
                        <span>Following</span>
                        <strong>134</strong>
                      </a>
                    </div>
                  </figcaption>
                </div>
                <div className="mt-4">
                  <button type="button" className="btn btn-common w-100">
                    Logout
                  </button>
                </div>
              </div>
              <div className="setting-right">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a href="/" className="nav-link active">
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/notifications">
                      Notification
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/privacy">
                      Privacy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/inventory">
                      Inventory
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="details">
                      <form className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="first_name" className="form-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            placeholder="Lettie"
                            defaultValue="Lettie"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="last_name" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            placeholder="Christen"
                            defaultValue="Christen"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="bio" className="form-label">
                            Bio
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="bio"
                            placeholder="Content Creator"
                            defaultValue="Content Creator"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="gender" className="form-label">
                            Gender
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="gender"
                            placeholder="Male"
                            defaultValue="Male"
                          />
                        </div>
                        <div className="col-md-6 ">
                          <label htmlFor="age" className="form-label">
                            Age
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="age"
                            placeholder={24}
                            defaultValue={24}
                          />
                        </div>
                        <div className="col-md-6 ">
                          <label htmlFor="number" className="form-label">
                            Contact Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="number"
                            placeholder="+92 9887673456"
                            defaultValue="+92 9887673456"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="christen@gmail.com"
                            defaultValue="christen@gmail.com"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="Birmingham"
                            defaultValue="Birmingham"
                          />
                        </div>
                        <div className="text-end">
                          <button type="button" className="btn btn-common">
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    ...
                  </div>
                  <div
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Setting;
