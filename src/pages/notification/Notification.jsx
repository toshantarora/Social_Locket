const Notification = () => {
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
            <a href="/" className="active">
              {" "}
              Notification
            </a>
          </li>
        </ul>
      </div>
      <div className="box-shadow p-0">
        <div className="notification">
          <ul>
            <li>
              <div className="user-post">
                <a href="/" className="post-profile">
                  <figure>
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
                        width={50}
                        height={50}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <p className="mb-0">
                      <strong>Robin Jennie</strong> commented on{" "}
                      <strong>Lettie Christen</strong> :{" "}
                      <span>Many conratulation</span>
                    </p>
                  </figcaption>
                </a>
                <div className="flex-shrink-0 dropdown">
                  <span>3h</span>
                  {/* <a href="#" class="d-block link-dark text-decoration-none header-profile" data-bs-toggle="dropdown" aria-expanded="false">
                      	          	<span><i class="fa-solid fa-ellipsis fs-3"></i></span>
                      	          </a>
                      	          <ul class="dropdown-menu text-small shadow">
                      	            <li><a class="dropdown-item" href="#"><i class="fa fa-trash-can"></i> Delete <span>Delete this notification</span></a></li>
                      	            <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-circle-xmark"></i> Mute <span>Stop seeing <span>Lettie</span>’s updates</span></a></li>
                      	            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell-slash"></i> Turn off <span>Stop receiving notifications like this</span></a></li>
                      	          </ul> */}
                </div>
              </div>
            </li>
            <li>
              <div className="user-post">
                <a href="/" className="post-profile">
                  <figure>
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
                        width={50}
                        height={50}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <p className="mb-0">
                      <strong>Robin Jennie</strong> commented on{" "}
                      <strong>Lettie Christen</strong> :{" "}
                      <span>Many conratulation</span>
                    </p>
                  </figcaption>
                </a>
                <div className="flex-shrink-0 dropdown">
                  <span>3h</span>
                  {/* <a href="#" class="d-block link-dark text-decoration-none header-profile" data-bs-toggle="dropdown" aria-expanded="false">
                      	          	<span><i class="fa-solid fa-ellipsis fs-3"></i></span>
                      	          </a>
                      	          <ul class="dropdown-menu text-small shadow">
                      	            <li><a class="dropdown-item" href="#"><i class="fa fa-trash-can"></i> Delete <span>Delete this notification</span></a></li>
                      	            <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-circle-xmark"></i> Mute <span>Stop seeing <span>Lettie</span>’s updates</span></a></li>
                      	            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell-slash"></i> Turn off <span>Stop receiving notifications like this</span></a></li>
                      	          </ul> */}
                </div>
              </div>
            </li>
            <li>
              <div className="user-post">
                <a href="/" className="post-profile">
                  <figure>
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
                        width={50}
                        height={50}
                      />
                    </picture>
                  </figure>
                  <figcaption>
                    <p className="mb-0">
                      <strong>Robin Jennie</strong> commented on{" "}
                      <strong>Lettie Christen</strong> :{" "}
                      <span>Many conratulation</span>
                    </p>
                  </figcaption>
                </a>
                <div className="flex-shrink-0 dropdown">
                  <span>3h</span>
                  {/* <a href="#" class="d-block link-dark text-decoration-none header-profile" data-bs-toggle="dropdown" aria-expanded="false">
                      	          	<span><i class="fa-solid fa-ellipsis fs-3"></i></span>
                      	          </a>
                      	          <ul class="dropdown-menu text-small shadow">
                      	            <li><a class="dropdown-item" href="#"><i class="fa fa-trash-can"></i> Delete <span>Delete this notification</span></a></li>
                      	            <li><a class="dropdown-item" href="#"><i class="fa-sharp fa-solid fa-circle-xmark"></i> Mute <span>Stop seeing <span>Lettie</span>’s updates</span></a></li>
                      	            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell-slash"></i> Turn off <span>Stop receiving notifications like this</span></a></li>
                      	          </ul> */}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Notification;
