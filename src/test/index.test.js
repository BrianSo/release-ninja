import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

const App = () => (
  <div>
    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
    <p>Hello World!</p>
  </div>
);

describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<App />);

    expect(app.find('p').text()).toEqual('Hello World!')
  });
});

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
