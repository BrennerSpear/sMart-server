import React from 'react';
import { Link } from 'react-router';
import { Segment, Divider, Grid } from 'semantic-ui-react'
import Search from './Search.jsx'

class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log()
    return (
      <div>
        <div className='jumbotron'>
          <div className='space'></div>
          <Grid centered>
            <Grid.Column width='12'>
                <h1>FIND GREAT DEALS IN SF,</h1>
                <h1>AND HAVE IT <span>IN 30 MINS</span> IN YOUR HOME</h1>
            </Grid.Column>
            <Grid.Row centered columns={3} only='computer'>
              <Grid.Column> 
              </Grid.Column>
              <Grid.Column width={4}>
                <Search searchData={this.props.searchData} size='huge' className='search'/>
              </Grid.Column>
              <Grid.Column> 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div>
          <Segment>
            <Grid>
              <Grid.Row centered columns={3} only='mobile'>
                <Grid.Column> 
                </Grid.Column>
                <Grid.Column width={4}>
                  <Search searchData={this.props.searchData} size='huge' className='search'/>
                </Grid.Column>
                <Grid.Column> 
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}


export default Jumbotron;