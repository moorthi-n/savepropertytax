import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface HomeSearchResultDataState {
    homeSearchResultList: HomeSearchResult[],
    loading: boolean,
    searchText :string
}



export class HomeSearch extends React.Component<RouteComponentProps<{}>, HomeSearchResultDataState>{
    constructor() {
        super();
        this.state = {
            homeSearchResultList: [], loading: true , searchText:''};    

        fetch('http://orionpa.tylerhost.net/Proxy/APIProxy.ashx?/WTAXAPI/api/v1/Search/Properties/quick/?f=78664&pn=1&st=4&so=desc&pt=RP;PP;MH;NR&ty=2017')
            .then(response => response.json() as Promise<HomeSearchResults>)
            .then(data => {
                console.log('Number of matches ' + data.ResultList.length);
               // this.setState({ homeSearchResultList: data.ResultList, loading: false})
            });
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    public render() {
        let contents = this.state.loading ?
            <p><em>loading.. </em></p>
            : HomeSearch.renderHomeSearchData(this.state.homeSearchResultList);

        return <div className="container">
                    <div className='col-sm-12'>            
                        <form className="searchTextBox" >
                            <div className="input-group stylish-input-group">
                                <input type="text" className="form-control" value={this.state.searchText} onChange={this.handleChangeEvent} placeholder="Search Homes" />
                                    <span className="input-group-addon">
                                    <button type="button" onClick={this.handleOnSubmit}>
                                            <span className="glyphicon glyphicon-search"></span>
                                     </button>
                                    </span>
                            </div>                              
                        </form>          
                    </div>
                    <div id="Results" className="container">
                        <h2>Results </h2>
                        {contents}
                    </div>
                </div>;
    }

    public handleOnSubmit(event: any): void {

        var searchText = this.state.searchText.trim();
        var url = 'http://orionpa.tylerhost.net/Proxy/APIProxy.ashx?/WTAXAPI/api/v1/Search/Properties/quick/?f=' + searchText+ '&pn=1&st=4&so=desc&pt=RP;PP;MH;NR&ty=2017'
        fetch(url)
            .then(response => response.json() as Promise<HomeSearchResults>)
            .then(data => {
                this.setState({ homeSearchResultList: data.ResultList, loading: false });

            });
    }

    public handleChangeEvent(event: any): void{
        this.setState({ homeSearchResultList: [], loading: false, searchText: event.target.value });
     }

    private static renderHomeSearchData(SearchResults: HomeSearchResult[]){
        return <table className='table'>
            <thead>
                <tr>
                    <th>Property Number</th>
                    <th>Quick Ref ID</th>
                    <th>Owner Name</th>
                    <th>Property Address</th>
                    <th>Tax Year</th>
                </tr>
            </thead>
            <tbody>
                {SearchResults.map(SearchResult =>
                    <tr key={SearchResult.PropertyNumber}>
                        <td>{SearchResult.PropertyNumber}</td>
                        <td>{SearchResult.PropertyQuickRefID}</td>
                        <td>{SearchResult.OwnerName}</td>
                        <td>{SearchResult.SitusAddress}</td>
                        <td>{SearchResult.SitusAddress}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//http://orionpa.tylerhost.net/Proxy/APIProxy.ashx?/WTAXAPI/api/v1/Search/Properties/quick/?f=78664&pn=1&st=4&so=desc&pt=RP;PP;MH;NR&ty=2017


interface HomeSearchResults {
    ResultList: HomeSearchResult[]
}


interface HomeSearchResult {
    PropertyNumber: string;
    PropertyQuickRefID: string;
    OwnerName: string;
    SitusAddress: string;
    TaxYear: string;
}
