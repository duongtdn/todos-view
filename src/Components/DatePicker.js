"use strict"

import React, { Component } from 'react'
import { Page, Toolbar, ToolbarButton, List, ListItem, ListHeader, Col, Row, Icon, Button } from 'react-onsenui'

import calendar from './calendar'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { data : [], today : 0, selectedDate : null };

    const d = new Date();
    this.today = {
      day : d.getDate(),
      month : d.getMonth(),
      year : d.getFullYear()
    };


    this.renderRow = this.renderRow.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);    
    this.isToday = this.isToday.bind(this);
    this.isThisMonth = this.isThisMonth.bind(this);
    this.isSelectedDate = this.isSelectedDate.bind(this);
    this.onSelectDate = this.onSelectDate.bind(this);

  }  

  componentWillMount() {
    if (this.props.selectedDate) {
      this.setState({ selectedDate : this.props.selectedDate });
      /* update pre selected date as selected date */
      const d = new Date(this.props.selectedDate);
      const selectedDate = {
        day : d.getDate(),
        month : d.getMonth(),
        year : d.getFullYear(),
        timestamp : this.props.selectedDate
      };
      this.onSelectDate(selectedDate);
    }
  }

  isToday(date) {
    return date.year === this.today.year && 
            date.month === this.today.month && 
            date.day === this.today.day;
  }

  isSelectedDate(date) {
    if (this.state.selectedDate) {
      const d = new Date(this.state.selectedDate);
      const selectedDate = {
        day : d.getDate(),
        month : d.getMonth(),
        year : d.getFullYear()
      };
      return date.year === selectedDate.year &&
              date.month === selectedDate.month &&
              date.day === selectedDate.day;
    } else {
      return false;
    }
  }

  isThisMonth(date) {
    return date.month === this.props.month;
  }

  onSelectDate(date) {
    if (date) {
      this.setState({ selectedDate : date.timestamp });
    } else {
      this.setState({ selectedDate : null });
    }
    
    this.props.onSelectDate(date);
  }

  renderRow(row, index) {
    const week = row; 
    const thisMonth = parseInt(this.props.month);   
    return (
      <ListItem key = {index} >
        <Row>
          {
            week.map( date => {
              const inactive = this.isThisMonth(date) ? '' : 'day-inactive';
              const highlight = this.isToday(date) ? 'today' : '';
              const outline = this.isSelectedDate(date) ? 'day-selected' : '';
              return (
                <Col key = {`${date.month}.${date.day}`} 
                      style = {{textAlign : 'center'}} > 
                  <div className = {`daybox ${inactive} ${highlight} ${outline}`}
                        onClick = {() => this.onSelectDate(date)} > 
                    {date.day} 
                  </div> 
                </Col>
              );
            })
          }
        </Row>
      </ListItem>
    );
  }

  renderHeader() {
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <ListHeader>
        <Row>
          {
            dayLabels.map( text => 
              <Col key={text} style = {{textAlign : 'center'}} > {text} </Col> 
            )
          }
        </Row>
      </ListHeader>
    );
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className = 'left'>
          <ToolbarButton onClick = {this.props.toPreviousMonth} > 
            <Icon icon = 'md-chevron-left' size = {24} /> 
          </ToolbarButton>
        </div>
        <div className = 'center'>
          <label> {calendar.month.map(this.props.month, 'long')} </label>
          <label> {this.props.year} </label>
        </div>
        <div className = 'right'>
          <ToolbarButton onClick = {this.props.toNextMonth} > 
            <Icon icon = 'md-chevron-right' size = {24} /> 
          </ToolbarButton>
        </div>
      </Toolbar>
    );    
  }

  render() {
    return (
      <Page renderToolbar = {this.renderToolbar} 
            className = {`calendar`} >
        <List dataSource = {this.props.calendar}
              renderRow = {this.renderRow}
              renderHeader = {this.renderHeader} />

        <div className = 'calendar-actionbar' >
          <Button modifier = 'quiet' onClick = {() => this.onSelectDate(null)} > 
            <Icon icon = 'md-close' />  Remove Selected Date 
          </Button>   
        </div>

        <div className = 'calendar-actionbar' >
          <Button modifier = 'quiet' onClick = {this.props.cancel} > 
            <Icon icon = 'md-arrow-back' /> Cancel 
          </Button>   
          <Button onClick = {this.props.done} > 
            Select 
          </Button> 
        </div>
        
      </Page>
    );
  }

}

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      calendar : [], 
      month : 0, 
      year : 0, 
      selectedDate : null,
      showCalendar : false,
      animateCalendar : false 
    };
    
    this.updateCalendar = this.updateCalendar.bind(this);
    this.toPreviousMonth = this.toPreviousMonth.bind(this);
    this.toNextMonth = this.toNextMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.done = this.done.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillMount() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.updateCalendar({ month, year });

  }

  updateCalendar({month, year}) {    
    const data = calendar.create({ month, year });
    this.setState({ calendar : data, month, year });
  }

  render() {
    return (
      <Page >
        <Calendar calendar = {this.state.calendar}  
                  month = {this.state.month} year = {this.state.year}   
                  selectedDate = {this.props.data.selectedDate}
                  onSelectDate = {this.selectDate}
                  toPreviousMonth = {this.toPreviousMonth} 
                  toNextMonth = {this.toNextMonth}
                  done = {this.done}
                  cancel = {this.cancel} />
      </Page>
    )
  }

  toPreviousMonth() {
    const previousMonth = this.state.month - 1;
    if (previousMonth < 0) {
      const previousYear = this.state.year - 1;
      this.updateCalendar({ month : 11, year : previousYear});
    } else {
      this.updateCalendar({ month : previousMonth, year : this.state.year });
    }
  }

  toNextMonth() {
    const nextMonth = this.state.month + 1;
    if (nextMonth > 11) {
      const nextYear = this.state.year + 1;
      this.updateCalendar({ month : 0, year : nextYear});
    } else {
      this.updateCalendar({ month: nextMonth, year : this.state.year });
    }
  }

  selectDate(date) {
    if (date) {
      this.setState({ selectedDate : date });
    } else {
      this.setState({ selectedDate : null });
    }
  }

  cancel() {
    this.props.popPage();
  }

  done() {
    this.props.data.get(this.state.selectedDate);
    this.props.popPage();
  }

}