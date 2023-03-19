import React, { Component } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './Feedback/Feedback';
import Statistic from './Statistics/Statistics';
import Notification from './Notification/Notification';
import css from './App.module.css';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  hanleClick = option => {
    this.setState(propValue => {
      return {
        [option]: propValue[option] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, option) => acc + option, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const positiveValue = Math.round(
      (100 * this.state.good) / this.countTotalFeedback()
    );
    return this.countTotalFeedback() === 0 ? 0 : positiveValue;
  };

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div className={css.container}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.hanleClick}
          />
        </Section>
        <Section title="Statistic">
          {this.countTotalFeedback() ? (
            <Statistic
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            ></Statistic>
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
