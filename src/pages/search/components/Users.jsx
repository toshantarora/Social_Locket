import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useEffect, useState } from "react";
import SearchImage from "../../../assets/images/search-form.png";
import { searchService } from "../../../services/SearchService";
import { getInitials } from "../../../helpers";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchService
      .GetUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.forename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="box-shadow filter-option">
        <form className="search-form position-relative" role="search">
          <input
            type="text"
            className="form-control"
            placeholder="eg. 'Birmingham' "
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <img src={SearchImage} alt="search" width={24} height={24} />
        </form>
        <div className="search-filter">
          <div className="filter-value">
            <select className="form-select" style={{ border: "none" }}>
              <option selected="" disabled="">
                Location
              </option>
              <option>Birmingham</option>
              <option>Birmingham</option>
              <option>Birmingham</option>
              <option>Birmingham</option>
            </select>

            <select className="form-select" style={{ border: "none" }}>
              <option selected="" disabled="">
                5 Miles
              </option>
              <option>5 miles</option>
              <option>10 miles</option>
              <option>15 miles</option>
            </select>

            <select className="form-select" style={{ border: "none" }}>
              <option selected="" disabled="">
                2 Pages
              </option>
              <option>2 Pages</option>
              <option>3 Pages</option>
              <option>5 Pages</option>
              <option>6 Pages</option>
            </select>

            <select className="form-select" style={{ border: "none" }}>
              <option selected="" disabled="">
                Price
              </option>
              <option>$ 100</option>
              <option>$ 200</option>
              <option>$ 300</option>
              <option>$ 400</option>
            </select>

            <select className="form-select" style={{ border: "none" }}>
              <option selected="" disabled="">
                Stakeholders
              </option>
              <option>Books</option>
              <option>Articles</option>
              <option>Blog</option>
            </select>
          </div>
          <div className="filter-button">
            <button
              type="button"
              className="btn"
              data-bs-toggle="modal"
              href="/filter_modal"
              //   role="button"
              title="Filter"
            >
              <i className="fa-solid fa-sliders" />
            </button>
          </div>
        </div>
      </div>
      <div className="box-shadow p-0">
        <Tabs className="search common-tab" defaultIndex={1}>
          <TabList className="nav nav-tabs">
            <Tab className="nav-link" selectedClassName="active">
              Map View
            </Tab>
            <Tab className="nav-link" selectedClassName="active">
              List View
            </Tab>
          </TabList>
          <TabPanel>
            <div
              className="tab-pane fade"
              id="maplist"
              role="tabpanel"
              aria-labelledby="maplist-tab"
            >
              <div className="map-view">
                <iframe
                  style={{ height: "100vh" }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d310918.2090576783!2d-2.3452549153972435!3d52.49636149776565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham%2C%20UK!5e0!3m2!1sen!2sin!4v1671098987512!5m2!1sen!2sin"
                  width="100%"
                  height="500px"
                  allowFullScreen=""
                  loading="lazy"
                  title="google Maps"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="post-profile" style={{ left: 140, top: 200 }}>
                  <figure>
                    <a href="/">
                      <span>RJ</span>
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
                          width={70}
                          height={70}
                        />
                      </picture>
                    </a>
                  </figure>
                </div>
                <div className="post-profile" style={{ left: 250, top: 300 }}>
                  <figure>
                    <a href="/">
                      <span>RJ</span>
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
                          width={70}
                          height={70}
                        />
                      </picture>
                    </a>
                  </figure>
                </div>
                <div className="post-profile" style={{ left: 200, top: 150 }}>
                  <figure>
                    <a href="/">
                      <span>RJ</span>
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
                          width={70}
                          height={70}
                        />
                      </picture>
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="tab-content">
            <div
              className="tab-pane fade show active"
              id="listview"
              role="tabpanel"
              aria-labelledby="listview-tab"
            >
              <ul>
                {filteredUsers.map((user) => (
                  <li>
                    <div className="user-post search-user">
                      <div className="post-profile">
                        <figure>
                          <a
                            href={`/profile/${user.forename}${user.surname}_${user.id}`}
                          >
                            <span hidden={user.profile_image}>
                              {getInitials(`${user.forename} ${user.surname}`)}
                            </span>
                            <picture hidden={!user.profile_image}>
                              <source
                                srcSet={user.profile_image}
                                type="image/webp"
                              />
                              <source
                                srcSet={user.profile_image}
                                type="image/png"
                              />
                              <img
                                loading="lazy"
                                src="assets/images/user-img.png"
                                data-src="assets/images/user-img.png"
                                alt="user-img"
                                className="img-fluid"
                                width={70}
                                height={70}
                              />
                            </picture>
                          </a>
                        </figure>
                        <figcaption>
                          <h5 className="mb-0">
                            <a
                              href={`/profile/${user.forename}${user.surname}_${user.id}`}
                            >{`${user.forename} ${user.surname}`}</a>
                          </h5>
                          <span>{user.bio}</span>
                          {/* <span>
                                                        <i className="fa fa-users" /> 200 followers
                                                    </span> */}
                        </figcaption>
                      </div>
                      {/* <div className="add-user">
                                                <button type="button" className="btn btn-add">
                                                    <i className="fa-solid fa-user-plus" />
                                                </button>
                                            </div> */}
                    </div>
                  </li>
                ))}
              </ul>
              {/* <div className="people-search">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="/" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link active" href="/">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="/">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="/">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="/" aria-label="Next">
                                                <span className="active" aria-hidden="true">
                                                    »
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div> */}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Users;
