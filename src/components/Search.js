import React, { Component } from 'react';
export default class Search extends Component {

    constructor() {

        super();
        this.state = {
            value: '',
            giphyImageData: [<h2 key="0">There are currently no GIFS</h2>],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // returns and processes JSON data from Giphy API
    searchKeyword(keyWord) {
        fetch(`http://api.giphy.com/v1/gifs/search?q=${keyWord}&api_key=D8qiB09X8jDja3OkYobyd1sI8qcFD8Tx`)
            .then(data => {
                // console.log(data)
                // formats the json file so that it can be parsed out
                return data.json()
            })
            .then(procData => {

                // console.log(procData.data);

                let mappedData;
                mappedData = procData.data.map((x, count) => {
                    return (
                        <div className="gif" key={count}>
                            <img src={x.images.original.url} alt="giphy" />
                        </div>
                    );
                })
                this.setState({ giphyImageData: mappedData });
            });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.searchKeyword(this.state.value);
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="GIF" />
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                <br/>
                {this.state.giphyImageData}
            </div>
        );
    }




}