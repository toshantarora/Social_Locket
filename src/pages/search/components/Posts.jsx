import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-tabs';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import SearchImage from '../../../assets/images/search-form.png';
import { searchService } from '../../../services/SearchService';
import { removeWhitespaces } from '../../../helpers';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";



const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCNvROXqDQ9kDgUF5ErbXREjLXkJFUcC54",
    libraries: ["places"]
  });

  const navigate = useNavigate();
  const handleTabClick = (index) => {
    if (index == 0) {
      fetchData(filteredPosts);
    }
  };

  useEffect(() => {
    searchService.GetPosts()
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        fetchData(data);
      })
      .catch((error) => console.error(error));
  }, []);


  const fetchData = async (posts) => {
    setMarkers([]);
    const newMarkers = await Promise.all(
      posts.map(async post => {
        const { lat, lng } = await fetchLatLng(post.location);
        return {
          id: post.id,
          position: { lat, lng },
          title: `${post.title}`,
          location: post.location,
        };
      })
    );
    setMarkers(newMarkers);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(value.toLowerCase()) ||
        post.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
    fetchData(filtered);
  };

  async function fetchLatLng(address) {
    const encodedAddress = encodeURIComponent(
      `${address}`
    );
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCNvROXqDQ9kDgUF5ErbXREjLXkJFUcC54`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    } else {
      throw new Error(`Error fetching latitude and longitude for address: ${address}`);
    }
  }
  const handleMarkerClick = (event, marker) => {
    const url = `/postDetails/${marker.id}_${removeWhitespaces(marker.title)}`;
    navigate(url, { replace: true });
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="box-shadow filter-option">
        <form className="search-form position-relative" role="search">
          <input
            type="text"
            className="form-control"
            placeholder="eg. 'Birmingham' "
            aria-label="Search"
            onKeyUp={handleFilterChange}
          />
          <img src={SearchImage} alt="search" width={24} height={24} />
        </form>
        <div className="search-filter">
          <div className="filter-value">
            <select className="form-select" style={{ border: 'none' }}>
              <option selected="" disabled="">
                Location
              </option>
              <option>Birmingham</option>
              <option>Birmingham</option>
              <option>Birmingham</option>
              <option>Birmingham</option>
            </select>

            <select className="form-select" style={{ border: 'none' }}>
              <option selected="" disabled="">
                5 Miles
              </option>
              <option>5 miles</option>
              <option>10 miles</option>
              <option>15 miles</option>
            </select>

            <select className="form-select" style={{ border: 'none' }}>
              <option selected="" disabled="">
                2 Pages
              </option>
              <option>2 Pages</option>
              <option>3 Pages</option>
              <option>5 Pages</option>
              <option>6 Pages</option>
            </select>

            <select className="form-select" style={{ border: 'none' }}>
              <option selected="" disabled="">
                Price
              </option>
              <option>$ 100</option>
              <option>$ 200</option>
              <option>$ 300</option>
              <option>$ 400</option>
            </select>

            <select className="form-select" style={{ border: 'none' }}>
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
              //data-bs-toggle="modal"
              //href="/filter_modal"
              //   role="button"
              title="Filter"
              variant="primary" 
              onClick={handleShow}
            >
              <i className="fa-solid fa-sliders" />
            </button>
          </div>         

      
        </div>
      </div>
      <div className="box-shadow p-0">
        <Tabs onSelect={handleTabClick} className="search common-tab" >
          <TabList className="nav nav-tabs">
            <Tab className="nav-link" selectedClassName="active">
              Map View
            </Tab>
            <Tab className="nav-link" selectedClassName="active">
              List View
            </Tab>
          </TabList>
          <TabPanel>
            <div className="map-view pt-5">
              {isLoaded && (<GoogleMap
                mapContainerStyle={{ width: "100%", height: "420px" }}
                center={center}
                zoom={2}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index} position={marker.position}
                    title={marker.title}
                    onClick={(event) => handleMarkerClick(event, marker)}
                  >
                  </Marker>
                ))}
              </GoogleMap>)}

              {!isLoaded && (<div>Loading Google Maps API...</div>)}

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
                {filteredPosts.map((post) => (
                  <li key={post.id}>
                    <div className="user-post search-user">
                      <div className="post-profile">
                        <figcaption>
                          <h5 className="mb-0">
                            <Link to={`/postDetails/${post.id}_${removeWhitespaces(post.title)}`}>{post.title}</Link>
                          </h5>
                          <span>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {' '}
                            {post.location}
                          </span>
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
       {/* Filter modal */}
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <button type="button" class="btn btn-common">Reset</button>
            <h5 class="modal-title m-auto">Filter your result</h5>            
        </Modal.Header>
        <Modal.Body>
        <div class="filter-value filter-value-mobile">
      		<h3 class="mb-4 text-center">Quick Search</h3>           
            <div class="form-floating">
                <select class="form-select" id="floatingSelect">
                  <option selected>Birmingham</option>
                  <option value="1">Birmingham</option>
                  <option value="2">Birmingham</option>
                  <option value="3">Birmingham</option>
                </select>
                <label for="floatingSelect">Location</label>
            </div> 
            <div class="form-floating">
                <select class="form-select" id="floatingSelect">
                  <option selected>5 miles</option>
                  <option value="1">10 miles</option>
                  <option value="2">15 miles</option>
                </select>
                <label for="floatingSelect">5 Miles</label>
            </div> 
            <div class="form-floating">
                <select class="form-select" id="floatingSelect">
                  <option selected>2 Pages</option>
                  <option value="1">1 Pages</option>
                  <option value="2">2 Pages</option>
                  <option value="3">5 Pages</option>
                </select>
                <label for="floatingSelect">Pages</label>
            </div>
            <div class="form-floating">
                <select class="form-select" id="floatingSelect">
                  <option selected>$ 100</option>
                  <option value="1">$ 100</option>
                  <option value="2">$ 100</option>
                  <option value="3">$ 100</option>
                </select>
                <label for="floatingSelect">Price</label>
            </div>            
            <div class="form-floating">
                <select class="form-select" id="floatingSelect">
                  <option selected>Books</option>
                  <option value="1">Article</option>
                  <option value="2">Blogs</option>
                </select>
                <label for="floatingSelect">Stakeholders</label>
            </div>
        </div>        
        <h3 class="mb-4 text-center">Settings</h3>
        <div>
            <h5>Pages</h5>
            <div class="pages-price">
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Default select example">
                      <option selected>2 Pages</option>
                      <option value="1">5 pages</option>
                      <option value="2">10 pages</option>
                      <option value="3">15 pages</option>
                    </select>
                    <label for="floatingSelect">Min Pages</label>
                </div>
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Default select example">
                      <option selected>4 Pages</option>
                      <option value="1">20 pages</option>
                      <option value="2">30 pages</option>
                      <option value="3">40 pages</option>
                    </select>
                    <label for="floatingSelect">Max Pages</label>
                </div>
            </div>
        </div>
        <div>
            <h5>Price</h5>
            <div class="pages-price">
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Default select example">
                      <option selected>$ 5</option>
                      <option value="1">$ 100</option>
                      <option value="2">$ 200</option>
                      <option value="3">$ 300</option>
                    </select>
                    <label for="floatingSelect">Min Price</label>
                </div>
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Default select example">
                      <option selected>$ 2</option>
                      <option value="1">$ 500</option>
                      <option value="2">$ 800</option>
                      <option value="3">$ 900</option>
                    </select>
                    <label for="floatingSelect">Max Price</label>
                </div>
            </div>
        </div>
        <div class="stakeholder-type">
            <h5>Stakeholder (Type)</h5>
            <label><input type="checkbox" onclick="toggle(this);" />All Type</label>
            <label><input type="checkbox" />Books</label>
            <label><input type="checkbox" />Articles</label>
            <label><input type="checkbox" />Blogs</label>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <button type="button" class="btn btn-common">Submit</button>
        </Modal.Footer>
      </Modal>
      {/* Filter modal */}
    </>
  );
};

export default Posts;
