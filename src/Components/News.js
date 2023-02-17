import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - Daily@News24`
  }
  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let passedData = await data.json();
    this.setState({
      articles: passedData.articles,
      totalResults: passedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    //let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=704282a9ddb34b2b825e397a0f465016&page=1&pageSize=${this.props.pageSize}`;
    //this.setState({loading:true})
    //let data = await fetch(url);
    //let passedData= await data.json()
    //this.setState({articles:passedData.articles, totalResults:passedData.totalResults, loading:false})
    this.updateNews();
  }
  handlePrevClick = async () => {
    //console.log("Previous")
    //let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=704282a9ddb34b2b825e397a0f465016&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //this.setState({loading:true})
    //let data = await fetch(url);
    //let passedData= await data.json()
    //console.log(passedData);
    //this.setState({
    //    page:this.state.page-1,
    //    articles:passedData.articles,
    //    loading:false
    //})
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    console.log("Next");
    //if (!(this.state.page+1 > Math.ceil(this.state.totalResults/18))){
    //let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=704282a9ddb34b2b825e397a0f465016&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //this.setState({loading:true})
    //let data = await fetch(url);
    //let passedData= await data.json()
    //console.log(passedData);
    //this.setState({
    //    page: this.state.page + 1,
    //    articles:passedData.articles,
    //    loading:false
    //})
    //
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }
  fetchMoreData= async()=>{
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let passedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(passedData.articles),
      totalResults: passedData.totalResults,
      loading: false,
    })

  }
  render(props) {
    return (
      
      <>
        <h1 className="text-center" style={{ margin: `30px 0px` }}>
          Daily@News24 - Top {this.capitalizeFirstLetter(this.props.category)} Headlines 
        </h1>
        {this.state.loading && <Spinner />}


        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
          <div className="row">
          
          { this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    desc={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              
            })}
        </div>

        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-warning"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 18)
            }
            type="button"
            className="btn btn-info"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
          </div>*/}
      </>
      
    )
  }
}

export default News;
