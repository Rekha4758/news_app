import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import propTypes from 'prop-types'



export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'

    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=393134cccef443769f21f347993785e5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parSedData = await data.json();
        this.setState({
            articles: parSedData.articles,
            totalResults: parSedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
       this.updateNews();
    }
    
    handlePrevClick = async () => {
      this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }
   
   
    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }
    render() {
        return (

            <div className="container my-3">
                <h2 className="text-center my-3">NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title ? element.title : " "} description={element.description ? element.description : " "}
                                imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                            />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News


