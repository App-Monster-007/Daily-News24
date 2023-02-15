import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, desc, imageurl, newsurl, author, date, source } = this.props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%',zIndex:'1'}}>
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
          <img
            src={
              imageurl
                ? imageurl
                : "https://gaadiwaadi.com/wp-content/uploads/2023/02/ola-s1-air-7.jpg"
            }
            className="card-img-top"
            width="50"
            height="200"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
            </h5>
            <p className="card-text">{desc}...</p>
            <p class="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsurl} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
