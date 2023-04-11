import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SearchImage from "../../../assets/images/search-form.png";
import React, { useEffect, useState } from "react";
import { searchService } from "../../../services/SearchService";
import { getAddress, getInitials } from "../../../helpers";
import { Link, useNavigate } from "react-router-dom";
import { removeWhitespaces } from '../../../helpers';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Users = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCNvROXqDQ9kDgUF5ErbXREjLXkJFUcC54",
    libraries: ["places"]
  });
  const [users, setUsers] = useState([]);
  const [userAdrress, setUserAddress] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);

  const navigate = useNavigate();
  const handleTabClick = (index) => {
    if (index == 0) {
      fetchData(filteredUsers, userAdrress);
    }
  };


  useEffect(() => {

    const fetchInitials = async () => {
      try {
        const response1 = searchService.GetUserAddress();
        const response2 = searchService.GetUsers();
        const [result1, result2] = await Promise.all([response1, response2]);

        setUserAddress(result1);
        setUsers(result2);
        setFilteredUsers(result2);

        fetchData(result2, result1);
      } catch (error) {
        console.error(error);
      }
    }

    fetchInitials();

  }, []);


  const fetchData = async (users, addresses) => {
    setMarkers([]);
    const newMarkers = await Promise.all(
      users.map(async user => {
        const userAddresses = addresses.filter((x) => x.id === user.id);
        if (userAddresses && typeof userAddresses !== 'undefined' && userAddresses.length > 0) {
          const markers = await Promise.all(userAddresses.map(async address => {
            const addr = getAddress(address.street_number, address.address_line_1, address.address_line_2, address.city, address.nick_name, address.postal_code);
            const { lat, lng } = await fetchLatLng(addr);
            return {
              id: user.id,
              position: { lat, lng },
              title: `${user.forename} ${user.surname}`,
              location: addr,
              profile_image: user.profile_image
            };
          }));
          return markers;
        } else {
          return [];
        }
      })
    );
    const flattenedMarkers = newMarkers.flat();
    setMarkers(flattenedMarkers);
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;

    const ids = userAdrress.filter((resp)=>resp.main_user_type?.toLowerCase()?.includes(value.toLowerCase()) && resp?.user_id != null )?.map((x)=>x.user_id);
    console.log('ids',ids);
    const filtered = users.filter(
      (user) =>
        user.forename.toLowerCase().includes(value.toLowerCase()) ||
        user.surname.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        ids.includes(user.id)
    );
    setFilteredUsers(filtered);
    fetchData(filtered, userAdrress);
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
    const url = `/profile/${removeWhitespaces(marker.title)}_${marker.id}`;
    navigate(url, { replace: true });
  }
  const iconOptions = {
    scale: 0.1,
    anchor: { x: 15, y: 30 }
  };
  const getMarkerIcon = (data) => {
    const icon = document.createElement('div');
    const initials = getInitials(data?.title);
    const imgSrc = data?.profile_image;
    const imgTag = `<img loading="lazy" src="${imgSrc}" data-src="${imgSrc}" alt="${data?.title}" class="img-fluid" width="70" height="70" />`;

    icon.innerHTML = `<div class="post-profile"><figure>${imgSrc ? `<picture><source srcset="${imgSrc}" type="image/webp"><source srcset="${imgSrc}" type="image/png">${imgTag}</picture>` : `<span>${initials}</span>`}</figure></div>`;

    const svgString = encodeURIComponent(
      `<svg fill="#f00" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${icon.innerHTML}</div></foreignObject></svg>`
    );

    //console.log(svgString)
    const markerIcon = new window.google.maps.MarkerImage(
      `data:image/svg+xml;charset=UTF-8,${svgString}`,
      null,
      null,
      null,
      new window.google.maps.Size(30, 30)
    );
    //console.log(markerIcon);

    return markerIcon;
  }


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
        <Tabs onSelect={handleTabClick} className="search common-tab" >
          <TabList className={'nav nav-tabs'}>
            <Tab className={'nav-link'} selectedClassName="active">Map View</Tab>
            <Tab className={'nav-link'} selectedClassName="active">List View</Tab>
          </TabList>
          <TabPanel>
            <div className="map-view pt-5">
              {isLoaded && (<GoogleMap
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={center}
                zoom={2}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    position={marker.position}
                    icon={getMarkerIcon(marker)}
                    title={marker.title}
                    className={'hello'}
                    onClick={(event) => handleMarkerClick(event, marker)}
                  >
                  </Marker>
                ))}
              </GoogleMap>)}
              {!isLoaded && (<div>Loading Google Maps API...</div>)}
            </div>
          </TabPanel>
          <TabPanel className={'tab-content'}>
            <div
              className="tab-pane fade show active"
              id="listview"
              role="tabpanel"
              aria-labelledby="listview-tab"
            >
              <ul>
                {filteredUsers && filteredUsers.length > 0 && filteredUsers.map(user => (
                  <li key={user.id}>
                    <div className="user-post search-user">
                      <div className="post-profile">
                        <figure>
                          <Link to={`/profile/${user.forename}${user.surname}_${user.id}`}>
                            <span hidden={user.profile_image}>{getInitials(`${user.forename} ${user.surname}`)}</span>
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
                          </Link>
                        </figure>
                        <figcaption>
                          <h5 className="mb-0">
                            <Link to={`/profile/${user.forename}${user.surname}_${user.id}`}>{`${user.forename} ${user.surname}`}</Link>
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
