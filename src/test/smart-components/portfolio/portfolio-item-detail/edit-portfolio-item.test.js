import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store' ;
import promiseMiddleware from 'redux-promise-middleware';
import { notificationsMiddleware, ADD_NOTIFICATION } from '@redhat-cloud-services/frontend-components-notifications/';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import EditPortfolioItem from '../../../../smart-components/portfolio/portfolio-item-detail/edit-portfolio-item';
import { CATALOG_API_BASE } from '../../../../utilities/constants';
import { UPDATE_TEMPORARY_PORTFOLIO_ITEM, UPDATE_PORTFOLIO_ITEM } from '../../../../redux/action-types';

describe('<EditPortfolioItem />', () => {
  const middlewares = [ thunk, promiseMiddleware(), notificationsMiddleware() ];
  let mockStore;
  let initialProps;

  const ComponentWrapper = ({ store, children }) => (
    <Provider store={ store }>
      <MemoryRouter>
        { children }
      </MemoryRouter>
    </Provider>
  );
  beforeEach(() => {
    mockStore = configureStore(middlewares);
    initialProps = {
      workflows: [],
      cancelUrl: '/cancel',
      product: {
        display_name: 'foo',
        id: '123'
      }
    };
  });

  it('should fail form validation and not submit the data', () => {
    const store = mockStore({});
    const wrapper = mount(
      <ComponentWrapper store={ store }>
        <EditPortfolioItem { ...initialProps } />
      </ComponentWrapper>
    );
    const input = wrapper.find('input#documentation_url');
    input.getDOMNode().value = 'foo';
    input.simulate('change');
    wrapper.update();
    wrapper.find('button').first().simulate('click');
    expect(store.getActions()).toEqual([]);
  });

  it('should submit form data', async done => {
    expect.assertions(3);
    const store = mockStore({});
    apiClientMock.patch(`${CATALOG_API_BASE}/portfolio_items/123`, mockOnce((req, res) => {
      expect(JSON.parse(req.body())).toEqual({
        description: null,
        distributor: null,
        long_description: null,
        support_url: null,
        display_name: 'foo',
        id: '123',
        documentation_url: 'https://www.google.com/',
        workflow_ref: null
      });
      return res.status(200).body({});
    }));

    const expectedActions = [{
      type: UPDATE_TEMPORARY_PORTFOLIO_ITEM,
      payload: { ...initialProps.product, documentation_url: 'https://www.google.com/' }
    }, {
      type: UPDATE_PORTFOLIO_ITEM,
      payload: { ...initialProps.product, documentation_url: 'https://www.google.com/'  }
    }, {
      type: ADD_NOTIFICATION,
      payload: expect.any(Object)
    }];

    const wrapper = mount(
      <ComponentWrapper store={ store }>
        <EditPortfolioItem { ...initialProps } />
      </ComponentWrapper>
    );
    const input = wrapper.find('input#documentation_url');
    input.getDOMNode().value = 'https://www.google.com/';
    input.simulate('change');
    wrapper.update();
    await act(async () => {
      wrapper.find('button').first().simulate('click');
    });
    expect(store.getActions()).toEqual(expectedActions);
    expect(wrapper.find(MemoryRouter).instance().history.location.pathname).toEqual('/cancel');
    done();
  });

  it('should trigger cancel callback', () => {
    expect.assertions(1);
    const store = mockStore({});
    const wrapper = mount(
      <ComponentWrapper store={ store }>
        <EditPortfolioItem { ...initialProps } />
      </ComponentWrapper>
    );
    wrapper.find('button').last().simulate('click');
    expect(wrapper.find(MemoryRouter).instance().history.location.pathname).toEqual('/cancel');
  });
});