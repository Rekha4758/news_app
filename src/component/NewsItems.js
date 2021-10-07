import React, { Component } from 'react'



export class NewsItems extends Component {

    render() {
        let { title, description, imageUrl, url, author, date, source } = this.props;
        return (

            <div>
                <div className="container my-3">

                    <div className="card my-3" >
                        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"85%" , zIndex:"1"}}>
                        {source}
                       </span>
                        <img src={!imageUrl ? "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/NDGZMFQ2CUI6ZPVIGCHKCNCZJ4.jpg&w=1440" : imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">by {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a rel="noopener noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default NewsItems
